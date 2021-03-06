const bucketModel = require("../models/bucket.model");
const objectModel = require("../models/object.model");
const uploadFile = require("../middlewares/upload.mdw");
const axios = require("axios");

module.exports = {
    async getAll(req, res) {
        const buckets = await bucketModel.all();
        return res.status(200).json({
            data: buckets,
        });
    },

    async getById(req, res) {
        const bucket_id = req.params.id;
        const bucket = await bucketModel.getById(bucket_id);
        return res.status(200).json({
            data: bucket,
        });
    },

    async addBucket(req, res) {
        const result = await bucketModel.add(req.body);
        if (result) {
            const bucket = await bucketModel.getById(result[0]);
            return res.status(201).json({
                message: "success",
                data: bucket,
            });
        }
        return res.status(400).json({
            message: "fail",
        });
    },

    async indexBucket(req, res) {
        const bucket_id = req.params.id;
        const objects = await objectModel.getByBucketWithParent(
            bucket_id,
            null
        );

        return res.status(200).json({
            data: objects,
        });
    },

    async getByFolder(req, res) {
        const bucket_id = req.params.id;
        const folder = req.params.folder;

        const object = await objectModel.getById(folder);
        if (object.type != "folder")
            return res.status(400).json({
                message: "Object is no folder",
            });

        const objects = await objectModel.getByBucketWithParent(
            bucket_id,
            folder
        );
        return res.status(200).json({
            data: objects,
        });
    },

    async deleteBucket(req, res) {
        const bucket = await bucketModel.getById(req.params.id);
        if (bucket === null)
            return res.json({
                message: "Bucket is not exist",
            });
        const objects = await objectModel.getByBucket(req.params.id);
        if (objects) {
            objects.forEach(async (object, index) => {
                await objectModel.delete(object.id);
            });
        }
        const result = await bucketModel.delete(req.params.id);

        if (result)
            return res.status(201).json({
                message: "success",
            });
        return res.status(400).json({
            message: "fail",
        });
    },

    async upload(req, res) {
        try {
            // await uploadFile(req, res);

            const privateToken = req.body.privateToken || null;
            const publicToken = req.body.publicToken || null;
            const users = await axios({
                method: "post",
                url: "https://user-service-s3.herokuapp.com/api/v1/users/by-keys",
                data: {
                    privateToken: privateToken,
                    publicToken: publicToken,
                },
            });
           

            if (users.data.user.permission == -1 || users.data.user.permission == 0)
                return res.json({
                    message: "User has not permission to upload ",
                });

            await uploadFile(req, res);

            if (req.file == undefined) {
                return res
                    .status(400)
                    .send({ message: "Please upload a file!" });
            }

            let object = {};
            object.bucket_id = req.params.id;

            if (req.body.parent && req.body.parent != "null")
                object.parent = req.body.parent;
            else object.parent = null;
            object.name = req.file.originalname;
            object.path = `/static/assets/uploads/${req.file.originalname}`;
            object.size = req.file.size;
            object.type = "file";
            object.file_type = req.body.file_type;
            object.user_id = req.body.user_id;

            const newObjectId = await objectModel.add(object);
            object.id = newObjectId[0];

            const currentDate = new Date();
            await bucketModel.update(req.params.id, {
                last_update: currentDate,
            });

            res.status(200).send({
                message: "Upload file success",
                data: object,
            });
        } catch (err) {
            if (err.code == "LIMIT_FILE_SIZE") {
                return res.status(500).send({
                    message: "File size cannot be larger than 2MB!",
                });
            }

            res.status(500).send({
                message: `Could not upload the file: ${req.file.originalname}. ${err}`,
            });
        }
    },

    async addFolder(req, res) {
        try {
            let object = {};
            object.bucket_id = req.params.id;
            if (req.body.parent && req.body.parent != "null")
                object.parent = req.body.parent;
            else object.parent = null;
            object.name = req.body.name;
            object.path = null;
            object.size = null;
            object.type = "folder";
            object.file_type = null;
            object.user_id = req.body.user_id;

            const newObjectId = await objectModel.add(object);
            object.id = newObjectId[0];

            const currentDate = new Date();
            await bucketModel.update(req.params.id, {
                last_update: currentDate,
            });

            res.status(200).send({
                message: "Create folder success",
                data: object,
            });
        } catch (err) {
            res.status(500).send({
                message: `Could not create folder`,
                error: err,
            });
        }
    },
};
