var express = require('express')
var router = express.Router()
const getall = require('./getall')

router.get('/', getall)

module.exports = router
