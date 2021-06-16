var express = require('express');
var router = express.Router();
const objectService = require('../services/object.service')

router.get('/', objectService.getAll)
router.get('/:id', objectService.getById)

module.exports = router;