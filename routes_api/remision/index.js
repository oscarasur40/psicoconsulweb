var express = require('express')
var router = express.Router()
//const getall = require('./getall')
const create = require('./create')
const isLoggedAPI_AS_PR = require('../../mw/isLoggedAPI_AS_PR')


//router.get('/', isLoggedAPI_SA_AS, getall)
router.post('/', isLoggedAPI_AS_PR, create)
module.exports = router
