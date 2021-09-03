var express = require('express')
var router = express.Router()

const isLoggedAPI_SA_AS_PR = require('../../mw/isLoggedAPI_SA_AS_PR')

const create = require('./create')
const getAll = require('./getAll')
const getById = require('./getById')
const patchIncById = require('./patchIncById')

router.post('/', isLoggedAPI_SA_AS_PR, create)
router.get('/', isLoggedAPI_SA_AS_PR, getAll)
router.get('/:id', isLoggedAPI_SA_AS_PR, getById)
router.patch('/:id/inc', isLoggedAPI_SA_AS_PR, patchIncById)

module.exports = router
