var express = require('express')
const CasoFallidoModel = require('../models/CasoFallidoModel')
const moment = require('moment')
var router = express.Router()
router.get('/imprimir', function (req, res){
    const casoId = req.query.id || null
    const usuario = req.user
    if(usuario.roles=='PG'){
      res.render('404', {
        title: '403 Forbidden',
        user: req.user
      })
    }else{
    CasoFallidoModel.findById(casoId,function(err,CasoFallidi){
      if(err){
        console.log(err)
        res.render('404', {
          title: '500 Internal Server Error',
          user: req.user
        })
      }else if(CasoFallidi == null){
        res.render('404', {
          title: '404 Not Found',
          user: req.user
        })
      }else{
        res.render('casoFallido/imprimir', {
          title: 'Imprimir Caso Fallido',
          user: req.user,
          CasoFallido: CasoFallidi,
          moment: require('moment')
        })
  
      }
    })
    }
  
  })
  module.exports = router