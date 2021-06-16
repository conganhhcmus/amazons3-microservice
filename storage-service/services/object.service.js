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
    }
    
}