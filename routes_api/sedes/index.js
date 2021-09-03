/* eslint-disable camelcase */
var express = require('express')
var router = express.Router()
const getall = require('./getall')
const getbyid = require('./getbyid')
const create = require('./create')
const patchbyid = require('./patchbyid')
const isLoggedAPI_SA_AS = require('../../mw/isLoggedAPI_SA_AS')
const isLoggedAPI_SA_AS_PR_PA = require('../../mw/isLoggedAPI_SA_AS_PR_PA')

router.get('/', isLoggedAPI_SA_AS, getall)
router.get('/:id', isLoggedAPI_SA_AS_PR_PA, getbyid)
router.post('/', isLoggedAPI_SA_AS, create)
router.patch('/:id', isLoggedAPI_SA_AS, patchbyid)
module.exports = router
