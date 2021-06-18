var express = require('express');
var router = express.Router();
const bucketModel = require('../models/bucket.model')

/* GET home page. */
router.get('/buckets',async function(req, res, next) {
    const user_id = req.body.id || null
    const buckets = await bucketModel.getByUserId(user_id)
    return res.json({
        data: buckets
    })
});

module.exports = router;
