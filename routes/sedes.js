var express = require('express')
var router = express.Router()
const SedeModel = require('../models/SedeModel')

/* GET home page. */
router.get('/', function (req, res, next) {
  SedeModel.find({ propietario: req.user._id }, function (err, Sedes) {
    if (err) {
      console.log(err)
    }
    res.render('sedes/index', {
      title: 'Sedes',
      user: req.user,
      Sedes: Sedes
    })
  })
})

router.get('/crearSede', function (req, res, next) {
  res.render('sedes/crearSede', {
    title: 'Crear Sede',
    paises: require('../lib/Paises'),
    departamentos: require('../lib/DepartamentosColombia'),
    municipios: require('../lib/MunicipiosColombia'),
    provincia: require('../lib/ProvinciaEcuador'),
    canton: require('../lib/CantonEcuador'),
    user: req.user
  })
})

router.get('/ver', function (req, res, next) {
  res.render('sedes/ver', {
    title: 'Crear Sede',
    user: req.user,
    sede_id: req.query.id
  })
})

module.exports = router
