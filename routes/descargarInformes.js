/* eslint-disable camelcase */
// TODO RUTA: Crear admin de sedevar express = require('express');
const express = require('express')
const router = express.Router()
const isLogged = require('../mw/isLogged')
const InformeModel = require('../models/InformeModel')
const ResumenHcModel = require('../models/ResumenHcModel')
const CierreModel = require('../models/CierreModel')
const UserModel = require('../models/UserModel')
const SedeModel = require('../models/SedeModel')
const HistoriaClinicaModel = require('../models/HistoriaClinicaModel')

/* GET home page. */

router.get('/informe', isLogged, function (req, res, next) {
  console.log(req.query.info)
  const remisionId = req.query.info || null
  InformeModel.findById(remisionId,function(err,infor){
    if(err){
      console.log(err)
      res.render('404', {
        title: '500 Internal Server Error',
        user: req.user
      })
    }else if(infor == null){
      res.render('404', {
        title: '404 Not Found',
        user: req.user
      })
    }else{
      res.render('descargar_Informes/informes', {
        title: 'Psicoconsul Web',
        user: req.user,
        moment: require('moment'),
        informe: infor,
      })
    }

  })

})

router.get('/resumen', isLogged, function (req, res, next) {
  console.log(req.query.resu)
  const resuemnId = req.query.resu || null
  ResumenHcModel.findById(resuemnId,function(err,resumenHC){
    if(err){
      console.log(err)
      res.render('404', {
        title: '500 Internal Server Error',
        user: req.user
      })
    }else if(resumenHC == null){
      res.render('404', {
        title: '404 Not Found',
        user: req.user
      })
    }else{
      res.render('descargar_Informes/resumen', {
        title: 'Psicoconsul Web',
        user: req.user,
        moment: require('moment'),
        resumen: resumenHC,
      })

    }

  })


})
router.get('/cierre', isLogged, function (req, res, next) {
  const cierreID = req.query.cierre || null
  CierreModel.findById(cierreID,function(err,cierreEcontrado){
    if(err){
      console.log(err)
      res.render('404', {
        title: '500 Internal Server Error',
        user: req.user
      })
    }else if(cierreEcontrado == null){
      res.render('404', {
        title: '404 Not Found',
        user: req.user
      })
    }else{
      HistoriaClinicaModel.find({Paciente: cierreEcontrado.paciente._id}, function(err, historiaE){
       if(err){
        res.render('404', {
          title: '500 Internal Server Error',
          user: req.user
        })  
       }else{
        res.render('descargar_Informes/cierre', {
          title: 'Psicoconsul Web',
          user: req.user,
          sede: req.user.Sedes,
          moment: require('moment'),
          cierre: cierreEcontrado,
          historias: historiaE
        })
       }
      })   
    }

  })
 

})

module.exports = router