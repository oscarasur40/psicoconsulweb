var express = require('express')
const SedeModel = require('../models/SedeModel')
const FormularioModel = require('../models/FormularioModel')
const HistoriaClinicaModel = require('../models/HistoriaClinicaModel')
const CitaModel = require('../models/CitaModel')

var router = express.Router()

/* GET home page. */
router.get('/', function (req, res, next) {
  var queryIn = {
    Paciente: [ req.user._id ],
    Sede: req.user.Sedes[0]._id,
    "formulario.preguntas" : {$elemMatch:{"id" : "firma_del_padre"}}
  }
  HistoriaClinicaModel.find(queryIn, function (err, Firmadocument) {
    if (err) {
      res.status(500).send({
        message: 'Error al cargar informacion de citas por paciente.',
        error: err
      })
    } else {
      res.render('firmaPaciente/index', {
        title: 'Firma Paciente',
        user: req.user,
        Firmadocument
      })
    }
  })
    
})

router.get('/firma', function (req, res, next) {
  const citaId = req.query.cita || null
  if (citaId) {
    CitaModel.findById(citaId, function (err, Cita) {
      const ProfEsDeCita = String(Cita.Profesional._id) == String(req.user._id)
      const CitaIsNull = Cita == null
      if (err) {
        res.render('404', {
          title: '403 Forbidden',
          user: req.user
        })
      } else if (CitaIsNull) {
        res.render('404', {
          title: '404 Not Found',
          user: req.user
        })
      } else {
        HistoriaClinicaModel.findOne({ Cita: citaId }, function (err, HistoriaClinica) {
          if (err) {
            res.render('404', {
              title: '403 Forbidden',
              user: req.user
            })
          } else if (HistoriaClinica == null) {
            FormularioModel.findById(Cita.Servicio.Formulario, '-Sede -creador', null, function (err, Formulario) {
              if (err) {
                res.render('404', {
                  title: '403 Forbidden',
                  user: req.user
                })
              } else if (Formulario == null) {
                res.render('404', {
                  title: '403 Forbidden',
                  user: req.user
                })
              } else {
                HistoriaClinicaModel.create({
                  Sede: Cita.Sede._id,
                  Cita: Cita._id,
                  formulario: Formulario,
                  datos_formulario: Object({}),
                  Paciente: Cita.Paciente,
                  Profesional: Cita.Profesional,
                  cita_cerrada_timestamp: moment(new Date()).unix(),
                  cerrado: false
                }, function (err, HistoriaClinica) {
                  if (err) {
                    res.render('404', {
                      title: '500 Internal Server Error',
                      user: req.user
                    })
                  } else if (!ProfEsDeCita) {
                    res.render('404', {
                      title: '403 Forbidden',
                      user: req.user
                    })
                  } else {
                    var tituloHead = 'Atender Cita'
                    if (HistoriaClinica.cerrado === true) {
                      tituloHead = 'Historia Clínica'
                    }
                    res.render('citas/atender/index', {
                      title: tituloHead,
                      user: req.user,
                      cie10: require('../lib/cie10'),
                      HistoriaClinica,
                      Cita
                    })
                  }
                })
              }
            })
          } else {
            var tituloHead = 'Atender Cita'
            if (HistoriaClinica.cerrado === true) {
              tituloHead = 'Historia Clínica'
            }
            
            res.render('firmaPaciente/firma/firma', {
              title: tituloHead,
              user: req.user,
              cie10: require('../lib/cie10'),
              HistoriaClinica,
              Cita
            })
            // if (ProfEsDeCita || HistoriaClinica.cerrado) {
            //   res.render('firmaPaciente/firma/firma', {
            //     title: tituloHead,
            //     user: req.user,
            //     cie10: require('../lib/cie10'),
            //     HistoriaClinica,
            //     Cita
            //   })
            // } else {
            //   res.render('404', {
            //     title: '403 Forbidden',
            //     user: req.user
            //   })
            // }
          }
        })
      }
    })
  } else {
    res.render('404', {
      title: '403 Forbidden',
      user: req.user
    })
  }
})


module.exports = router