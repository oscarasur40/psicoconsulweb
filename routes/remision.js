var express = require('express')
const RemisionModel = require('../models/RemisionModel')
const UserModel = require('../models/UserModel')
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
        RemisionModel.find({
        Paciente: req.user.id
      }, '-Sede -formulario -datos_formulario -Paciente', { populate: 'Profesional' },
      function (err, RemisionEcontrada) {
        if (err) {
          console.log(err)
          res.render('404', {
            title: '500 Internal Server Error',
            user: req.user
          })
        } else {
          res.render('remision/dowload', {
            title: 'ver Remisiónes',
            user: req.user,
            Profesional: RemisionEcontrada.Profesional,
            remision: RemisionEcontrada,
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
router.get('/ver', function (req, res){
  const remisionId = req.query.remision || null
  RemisionModel.findById(remisionId,function(err,remsionU){
    if(err){
      console.log(err)
      res.render('404', {
        title: '500 Internal Server Error',
        user: req.user
      })
    }else if(remsionU == null){
      res.render('404', {
        title: '404 Not Found',
        user: req.user
      })
    }else{
      res.render('remision/ver', {
        title: 'Descargar Remisión',
        user: req.user,
        remision: remsionU,
        moment: require('moment')
      })

    }

  })

})
module.exports = router