var express = require('express')
var router = express.Router()
const UserModel = require('../models/UserModel')
const SedeModel = require('../models/SedeModel')
const HistoriaClinicaModel = require('../models/HistoriaClinicaModel')
const RecepcionHistoria = require('../models/RecepcionPaciente')
const CasoFallidoModel = require('../models/CasoFallidoModel')
const RemisionModel = require('../models/RemisionModel')

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
          if(sede._id == '60049afed00d9b43a49e4da7'){
            var titulo = 'Consultantes'
          }else{
            var titulo = 'Pacientes'
          }
          res.render('usuarios/pacientes_por_sede', {
            title: titulo,
            user: req.user,
            pacientes: pacientes,
            sede
          })
        }
      })
    }
  })
})

router.get('/crear', function (req, res, next) {
  if(req.query.sede == '60049afed00d9b43a49e4da7'){
    var titulo = 'Crear consultantes'
  }else{
    var titulo = 'Crear pacientes'
  }
  res.render('usuarios/crearPaciente', {
    title: titulo,
    user: req.user,
    departamentos: require('../lib/DepartamentosColombia'),
    eps: require('../lib/EPS'),
    paises: require('../lib/Paises'),
    municipios: require('../lib/MunicipiosColombia'),
    provincia: require('../lib/ProvinciaEcuador'),
    canton: require('../lib/CantonEcuador')
  })
})

// router.get('/crearSede', function (req, res, next) {
//   res.render('sedes/crearSede', {
//     title: 'Crear Sede',
//     user: req.user
//   })
// })

router.get('/ver', function (req, res) {
  UserModel.findById(req.query.id, function(err, PacienteEncontrado) {
    if (err) {
      
      res.render('404', {
        title: '500 Internal Server Error',
        user: req.user
      })
    } else if (PacienteEncontrado == null) {
      res.render('404', {
        title: '404 Not Found',
        user: req.user
      })
    } else {
      HistoriaClinicaModel.find({
        Paciente: req.query.id
      }, '-Sede -formulario -datos_formulario -Paciente', { populate: 'Profesional' },
      function (err, HisotriasClincias) {
        if (err) {
          
          res.render('404', {
            title: '500 Internal Server Error',
            user: req.user
          })
        } else {
          RecepcionHistoria.find({ Paciente: req.query.id}, function(err, reception) {
            if (err) {
              
              res.render('404', {
                title: '500 Internal Server Error',
                user: req.user
              })
            }else{
              CasoFallidoModel.find({ Paciente: req.query.id}, function(err, casoFallidi) {
                if(err){
                  res.render('404', {
                    title: '500 Internal Server Error',
                    user: req.user
                  })
                }else{
                  RemisionModel.find({ Paciente: req.query.id}, function(err, remition) {
                    if(err){
                      res.render('404', {
                        title: '500 Internal Server Error',
                        user: req.user
                      })
                    }else{  
                      res.render('usuarios/pacientes/ver', {
                        title: 'Ver Paciente',
                        user: req.user,
                        sede_id: req.query.id,
                        paciente: PacienteEncontrado,
                        historias: HisotriasClincias,
                        departamentos: require('../lib/DepartamentosColombia'),
                        eps: require('../lib/EPS'),
                        paises: require('../lib/Paises'),
                        municipios: require('../lib/MunicipiosColombia'),
                        provincia: require('../lib/ProvinciaEcuador'),
                        canton: require('../lib/CantonEcuador'),
                        moment: require('moment'),
                        recepcion: reception,
                        casoFallido: casoFallidi,
                        remision: remition
                      })
                    }
                  })
                }

              })
            }
          })          
        }
      })
    }
  })
})

module.exports = router
