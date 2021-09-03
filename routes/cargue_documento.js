var express = require('express')
const HistoriaClinicaModel = require('../models/HistoriaClinicaModel')
const UserModel = require('../models/UserModel')
const SedeModel = require('../models/SedeModel')
const moment = require('moment')
var router = express.Router()

router.get('/', function (req, res, next) {  
  res.render('cargue_documento/upload', {
    title: 'Cargue Documento',
    user: req.user
  })
})

module.exports = router