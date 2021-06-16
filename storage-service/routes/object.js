var express = require('express');
var router = express.Router();
const objectService = require('../services/object.service')

router.get('/', objectService.getAll)
router.get('/:id', objectService.getById)
router.delete('/:id', objectService.deleteObject)

module.exports = router;