var express = require('express')
const SedeModel = require('../models/SedeModel')
const FormularioModel = require('../models/FormularioModel')

var router = express.Router()

/* GET home page. */
router.get('/', function (req, res, next) {
  // eslint-disable-next-line eqeqeq
  if (req.query.sede != undefined) {
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
        res.render('formularios/index', {
          title: 'Formularios',
          user: req.user,
          sede: sede
        })
      }
    })
  } else {
    res.render('404', {
      title: '404 Not Found',
      user: req.user
    })
  }
})

router.get('/crear', function (req, res, next) {
  // eslint-disable-next-line eqeqeq
  if (req.query.sede != undefined) {
    SedeModel.findById(req.query.sede, function (err, sede) {
      if (err) {
        
        res.render('404', {
          title: '404 Not Found',
          user: req.user
        })
      } else {
        res.render('formularios/crear', {
          title: 'Crear Formulario',
          user: req.user,
          sede: sede,
          cie10: require('../lib/cie10')
        })
      }
    })
  } else {
    res.render('404', {
      title: '404 Not Found',
      user: req.user
    })
  }
})

router.get('/vista-previa', function (req, res, next) {
  // eslint-disable-next-line eqeqeq
  if (req.query.formulario != undefined) {
    FormularioModel.findById(req.query.formulario, function (err, formulario) {
      
      if (err) {
        
        res.render('404', {
          title: '500 Not Found',
          user: req.user
        })
      } else if (formulario == null) {
        res.render('404', {
          title: '404 Not Found',
          user: req.user
        })
      } else {
        res.render('formularios/vista-previa', {
          title: 'Formularios',
          user: req.user,
          formulario: formulario,
          cie10: require('../lib/cie10')
        })
      }
    })
  } else {
    res.render('404', {
      title: '404 Not Found',
      user: req.user
    })
  }
})

module.exports = router
