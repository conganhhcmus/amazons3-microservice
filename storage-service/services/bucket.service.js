const bucketModel = require('../models/bucket.model')

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
    }
}