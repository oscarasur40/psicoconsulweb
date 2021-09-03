var express = require('express')
var router = express.Router()
//const getall = require('./getall')
const sendEmail = require('./sendEmail')



//router.get('/', isLoggedAPI_SA_AS, getall)
router.post('/sendEmail', sendEmail)
module.exports = router