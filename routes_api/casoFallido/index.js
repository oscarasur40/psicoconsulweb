const express = require('express')
const router = express.Router()

const isLoggedAPI_SA_AS_PR = require('../../mw/isLoggedAPI_SA_AS_PR')
/* GET home page. */
const create = require('./create')

router.post('/', isLoggedAPI_SA_AS_PR, create)

module.exports = router