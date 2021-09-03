var express = require('express')
var router = express.Router()
const UserModel = require('../models/UserModel')
const SedeModel = require('../models/SedeModel')

/* GET home page. */
router.get('/', function (req, res, next) {
  UserModel.find({
    Sedes: req.query.sede,
    tipo: 'paciente'
  }, function (err, pacientes) {
    if (err) {
      
      res.render('404', {
        title: '500 Not Found',
        user: req.user
      })
    } else if (pacientes == null) {
      res.render('404', {
        title: '404 Not Found',
        user: req.user
      })
    } else {
      SedeModel.findById(req.query.sede, function (err, sede) {
        if (err) {
          
          res.render('404', {
            title: '500 Not Found',
            user: req.user
          })
        } else if (sede == null) {
          res.render('404', {
            title: '404 Not Found',
            user: req.user
          })
        } else {
          res.render('usuarios/profesionales/', {
            title: 'Profesionales',
            user: req.user,
            pacientes: pacientes,
            sede
          })
        }
      })
    }
  })
})
router.get('/practicantes', function (req, res, next) {
  console.log(">>>" ,req.user._id)
  UserModel.find({
    Sedes: req.query.sede,
    tipo: 'profesional',
    supervisorAsign: req.user._id
  }, function (err, pacientes) {
   
    if (err) {
      console.log(err)
      res.render('404', {
        title: '500 Not Found',
        user: req.user
      })
    } else if (pacientes == null) {
      res.render('404', {
        title: '404 Not Found',
        user: req.user
      })
    } else {
      SedeModel.findById(req.query.sede, function (err, sede) {
        if (err) {
          console.log(err)
          res.render('404', {
            title: '500 Not Found',
            user: req.user
          })
        } else if (sede == null) {
          res.render('404', {
            title: '404 Not Found',
            user: req.user
          })
        } else {
          res.render('usuarios/profesionales/indexPracticante', {
            title: 'Practicantes',
            user: req.user,
            practicante: pacientes,
            sede
          })
        }
      })
    }
  })
})

router.get('/crear', function (req, res, next) {
  res.render('usuarios/profesionales/crearProfesional', {
    title: 'Crear Profesional',
    user: req.user,
    sede_id: req.query.sede,
    paises: require('../lib/Paises'),
    departamentos: require('../lib/DepartamentosColombia'),
    municipios: require('../lib/MunicipiosColombia')
  })
})

router.get('/ver', function (req, res) {
  UserModel.findById(req.query.id, function (err, ProfesionalEncontrado) {
    console.log(">>", req.user.roles)
    if (err) {
      
      res.render('404', {
        title: '500 Internal Server Error',
        user: req.user
      })
    } else if (ProfesionalEncontrado == null || req.user.roles == 'PG' ) {
      res.render('404', {
        title: '404 Not Found',
        user: req.user
      })
    } else {
      res.render('usuarios/profesionales/ver', {
        title: 'Ver Profesional',
        user: req.user,
        sede_id: req.query.id,
        profesional: ProfesionalEncontrado,
        moment: require('moment'),
        paises: require('../lib/Paises'),
        departamentos: require('../lib/DepartamentosColombia'),
        municipios: require('../lib/MunicipiosColombia')
      })
    }
  })
})

module.exports = router