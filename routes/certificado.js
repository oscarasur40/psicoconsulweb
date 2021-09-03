var express = require('express')
const HistoriaClinicaModel = require('../models/HistoriaClinicaModel')
const UserModel = require('../models/UserModel')
const CitaModel = require('../models/CitaModel')
const FormularioModel = require('../models/FormularioModel')
const moment = require('moment')
var router = express.Router()

router.get('/', function (req, res, next) {
  UserModel.findById(req.user.id, function(err, PacienteEncontrado) {
    if (err) {
      console.log(err)
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
        Paciente: req.user.id
      }, '-Sede -formulario -datos_formulario -Paciente', { populate: 'Profesional' },
      function (err, HisotriasClincias) {
        if (err) {
          console.log(err)
          res.render('404', {
            title: '500 Internal Server Error',
            user: req.user
          })
        } else {
          res.render('certificado/dowload', {
            title: 'Descargo Historial',
            user: req.user,
            sede_id: req.user.Sedes[0]._id,
            paciente: PacienteEncontrado,
            historias: HisotriasClincias,
            departamentos: require('../lib/DepartamentosColombia'),
            eps: require('../lib/EPS'),
            paises: require('../lib/Paises'),
            municipios: require('../lib/MunicipiosColombia'),
            moment: require('moment')
          })
        }
      })
    }
  })
})
router.get('/ver', function (req, res, next) {
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
          } else {
            var tituloHead = 'Ver Certificado'
            console.log(ProfEsDeCita)
            console.log(HistoriaClinica.cerrado)
            if (ProfEsDeCita || HistoriaClinica.cerrado) {
              res.render('certificado/ver', {
                title: tituloHead,
                user: req.user,
                cie10: require('../lib/cie10'),
                HistoriaClinica,
                Cita,
                moment: require('moment')
              })
            } else {
              res.render('404', {
                title: '403 Forbidden',
                user: req.user
              })
            }
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