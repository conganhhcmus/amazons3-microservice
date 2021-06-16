const bucketModel = require('../models/bucket.model')
const objectModel = require('../models/object.model')

module.exports = {
    async getAll (req, res) 
    {
        const objects = await objectModel.all()
        return res.status(200).json({
            data: objects
        })
    },

    async getById (req, res) 
    {
        const id = req.params.id
        const object = await objectModel.getById(id)
        return res.json({
            data: object
        })
    },

    async deleteObject (req, res)
    {
        const object = await objectModel.getById(req.params.id)
        if(object === null)
            return res.json({
                message: "Object is not exist"
            })
            
        const result = await objectModel.delete(req.params.id)

        if(result)
            return res.status(201).json({
                message: "success",
            })
        return res.status(400).json({
            message: "fail"
        })
    }
    
}