var express = require('express');
var router = express.Router();
const bucketService = require('../services/bucket.service')
const validator = require('../middlewares/validate.mdw')
const addBucketSchema = require('../schema/addBucket.json')
const addObjectSchema = require('../schema/addObject.json')

/* GET users listing. */
router.get('/', bucketService.getAll);
router.post('/',  validator(addBucketSchema), bucketService.addBucket)
router.get('/:id/index', bucketService.indexBucket)
router.get('/:id/:folder', bucketService.getByFolder)
router.delete('/:id', bucketService.deleteBucket)
router.post('/:id/add', bucketService.addObject)
module.exports = router;
