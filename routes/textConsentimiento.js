var express = require('express')
const SedeModel = require('../models/SedeModel')
const FormularioModel = require('../models/FormularioModel')
const HistoriaClinicaModel = require('../models/HistoriaClinicaModel')
const CitaModel = require('../models/CitaModel')

var router = express.Router()

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('configuracion/textConsentimiento/index', {
        title: 'Consimiento Pacientes por Profesional',
        user: req.user
    })
    
})

module.exports = router