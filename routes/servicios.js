var express = require('express')
var router = express.Router()
const ServicioModel = require('../models/ServicioModel')
const SedeModel = require('../models/SedeModel')

/* GET home page. */
router.get('/', function (req, res, next) {
  
  ServicioModel.find({
    Sede: req.query.sede
  }, function (err, servicios) {
    if (err) {
      
      res.render('404', {
        title: '500 Not Found',
        user: req.user
      })
    } else if (servicios == null) {
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
          res.render('servicios/index', {
            title: 'Servicios',
            user: req.user,
            servicios: servicios,
            sede
          })
        }
      })
    }
  })
})

router.get('/crear', function (req, res, next) {
  res.render('servicios/crearServicio', {
    title: 'Crear Servicio',
    user: req.user,
    cups: require('../lib/CUPS')
  })
})

router.get('/profesionales', function (req, res) {
  ServicioModel.findById(req.query.servicio, function (err, servicio) {
    if (err) {
      
      res.render('404', {
        title: '500 Not Found',
        user: req.user
      })
    } else if (servicio == null) {
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
          res.render('servicios/profesionales', {
            title: 'Administrar Profesionales',
            user: req.user,
            sede,
            servicio
          })
        }
      })
    }
  })
})

module.exports = router
