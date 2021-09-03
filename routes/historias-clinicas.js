var express = require('express')
var router = express.Router()
const HistoriaClinicaModel = require('../models/HistoriaClinicaModel')

router.get('/impresion', function (req, res) {
  const historia = req.query.historia || null
  HistoriaClinicaModel.findById(historia, function (err, dataHistoria) {
    if (err) {
      
      res.render('404', {
        title: '500 Internal Server Error',
        user: req.user
      })
    } else if (dataHistoria == null) {
      res.render('404', {
        title: '404 Not Found',
        user: req.user
      })
    } else {
      res.render('historias-clinicas/impresion', {
        title: 'Imprimir Historia Clínica',
        user: req.user,
        HistoriaClinica: dataHistoria,
        moment: require('moment'),
        municipios: require('../lib/MunicipiosColombia')
      })
    }
  })
})

module.exports = router
