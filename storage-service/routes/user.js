var express = require('express');
var router = express.Router();
const bucketModel = require('../models/bucket.model')

/* GET home page. */
router.get('/buckets',async function(req, res, next) {
    const user_id = req.query.user_id || null
    const root_id = await bucketModel.getRootByUserId(user_id)
    const buckets = await bucketModel.getByUserId(root_id)
    return res.json({
        data: buckets
    })
});

module.exports = router;
