var express = require('express')
var router = express.Router()

const create = require('./create')

// TODO Crear Superuser solo cuadno no haya sido creado
router.get('/create', create)

//
module.exports = router
