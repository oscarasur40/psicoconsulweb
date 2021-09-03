var express = require('express')
const HistoriaClinicaModel = require('../models/HistoriaClinicaModel')
const UserModel = require('../models/UserModel')
var router = express.Router()

router.get('/', function (req, res, next) {
  UserModel.findById(req.user.id, function(err, PacienteEncontrado) {
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
        Paciente: req.user.id
      }, '-Sede -formulario -datos_formulario -Paciente', { populate: 'Profesional' },
      function (err, HisotriasClincias) {
        if (err) {
          
          res.render('404', {
            title: '500 Internal Server Error',
            user: req.user
          })
        } else {
          res.render('downloadHistory/dowload', {
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
module.exports = router