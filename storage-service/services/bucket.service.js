const bucketModel = require('../models/bucket.model')
const objectModel = require('../models/object.model')
const uploadFile = require("../middlewares/upload.mdw");

module.exports = {
    async getAll (req, res) 
    {
        const buckets = await bucketModel.all()
        return res.status(200).json({
            data: buckets
        })
    },

    async addBucket(req, res){
        const result = await bucketModel.add(req.body)
        if(result)
            return res.status(201).json({
                message: "success",
            })
        return res.status(400).json({
            message: "fail"
        })
    },

    async indexBucket(req, res){
        const bucket_id = req.params.id
        const objects = await objectModel.getByBucketWithParent(bucket_id,null)
        
        return res.status(200).json({
            data: objects
        })
    },

    async getByFolder(req, res){
        const bucket_id = req.params.id
        const folder = req.params.folder

        const object = await objectModel.getById(folder)
        if(object.type != "folder")
            return res.status(400).json({
                message: "Object is no folder"
            })
        
        const objects = await objectModel.getByBucketWithParent(bucket_id, folder)
        return res.status(200).json({
            data: objects
        })

    },

    async deleteBucket(req, res){
        const bucket = await bucketModel.getById(req.params.id)
        if(bucket === null)
            return res.json({
                message: "Bucket is not exist"
            })

        const result = await bucketModel.delete(req.params.id)

        if(result)
            return res.status(201).json({
                message: "success",
            })
        return res.status(400).json({
            message: "fail"
        })
    },

    async upload(req, res){
        try {
            await uploadFile(req, res);

            if (req.file == undefined) {
                return res.status(400).send({ message: "Please upload a file!" });
            }

            let object = {}
            object.bucket_id = req.params.id
            if(req.body.parent)
                object.parent = req.body.parent
            else
                object.parent = null
            object.name = req.file.originalname
            object.path = `/resources/static/assets/uploads/${req.file.originalname}`
            object.size = req.file.size
            object.type = "file"

            await objectModel.add(object)

            res.status(200).send({
                message: "Upload file success",
                data: object
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

    async addFolder(req, res){
        try {
            let object = {}
            object.bucket_id = req.params.id
            if(req.body.parent)
                object.parent = req.body.parent
            else
                object.parent = null
            object.name = req.body.name
            object.path = null
            object.size = null
            object.type = "folder"

            await objectModel.add(object)

            res.status(200).send({
                message: "Create folder success",
                data: object
            });
        } catch (err) {
            res.status(500).send({
              message: `Could not create folder`,
              error: err
            });
        }
    }
}