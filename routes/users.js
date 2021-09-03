var express = require('express')
var router = express.Router()
const UserModel = require('../models/UserModel')
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('usuarios/index', {
    title: 'Usuarios',
    user: req.user
  })
})

router.get('/crearAdminSede', function (req, res, next) {
  res.render('usuarios/crearAdminSede', {
    title: 'Crear Administrador de Sede',
    user: req.user
  })
})

router.get('/crearPaciente', function (req, res, next) {
  res.render('usuarios/crearPaciente', {
    title: 'Crear Paciente',
    user: req.user,
    departamentos: require('../lib/DepartamentosColombia'),
    municipios: require('../lib/MunicipiosColombia')
  })
})

router.get('/crearProfesional', function (req, res, next) {
  res.render('usuarios/crearProfesional', {
    title: 'Crear Profesional',
    user: req.user
  })
})

router.get('/ver', function (req, res, next) {
  UserModel.findById({
    _id: req.query.id
  }, function (err, administrador) {
    if (err) {     
      res.render('404', {
        title: '500 Not Found',
        user: req.user
      })
    } else if (administrador == null) {
      res.render('404', {
        title: '404 Not Found',
        user: req.user
      })
    }else{
      res.render('usuarios/verPerfil', {
        title: 'Perfil',
        user: req.user,
        admin: administrador,
        user_id: req.query.id,
        departamentos: require('../lib/DepartamentosColombia'),
        municipios: require('../lib/MunicipiosColombia'),
        moment: require('moment')
      })
    }
  })
})

module.exports = router
