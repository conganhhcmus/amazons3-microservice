var express = require('express');
var router = express.Router();
const bucketService = require('../services/bucket.service')
const validator = require('../middlewares/validate.mdw')
const addBucketSchema = require('../schema/addBucket.json')

/* GET users listing. */
router.get('/', bucketService.getAll);
router.post('/',  validator(addBucketSchema), bucketService.addBucket)
router.delete('/:id', bucketService.deleteBucket)
module.exports = router;
