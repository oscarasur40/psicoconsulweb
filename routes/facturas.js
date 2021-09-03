var express = require('express')
var router = express.Router()
const FacturaModel = require('../models/FacturaModel')
const CitaModel = require('../models/CitaModel')
const SedeModel = require('../models/SedeModel')
const moment = require('moment')

router.get('/', function (req, res) {
  const sede = req.query.sede || null
  SedeModel.findById(sede, 'nombre', function (err, Sede) {
    if (err) {
      
      res.render('404', {
        title: '500 Internal Server Error',
        user: req.user
      })
    } else if (Sede == null) {
      res.render('404', {
        title: '404 Not Found',
        user: req.user
      })
    } else {
      res.render('facturas/index', {
        title: 'Facturas',
        user: req.user,
        moment: moment,
        sede_id: sede,
        Sede
      })
    }
  })
})

router.get('/impresion', function (req, res) {
  const factura = req.query.factura || null
  FacturaModel.findById(factura, null, {
    populate: 'Paciente Cita Sede'
  }, function (err, Factura) {
    if (err) {
      
      res.render('404', {
        title: '500 Internal Server Error',
        user: req.user
      })
    } else if (Factura == null) {
      res.render('404', {
        title: '404 Not Found',
        user: req.user
      })
    } else {
      res.render('facturas/impresion', {
        title: 'Imprimir Factura',
        user: req.user,
        Factura: Factura,
        moment: moment,
        municipios: require('../lib/MunicipiosColombia'),
        Departamento: require('../lib/DepartamentosColombia')
      })
    }
  })
})

router.get('/crear', function (req, res, next) {
  const citaId = req.query.cita || null
  if (citaId) {
    CitaModel.findById(citaId, function (err, Cita) {
      if (err) {
        res.render('404', {
          title: '500 Internal Server Error C',
          user: req.user
        })
      } else if (Cita == null) {
        res.render('404', {
          title: '404 Not Found',
          user: req.user
        })
      } else {
        FacturaModel.findOne({
          Cita: citaId
        }, null, { populate: 'Paciente Cita' }, function (err, Factura) {
          if (err) {
            res.render('404', {
              title: '403 Forbidden F',
              user: req.user
            })
          } else if (Factura == null) {
            let servicio = Object({})
            if (Cita.Servicio == null) {
              servicio.cups_codigo = ' '
              servicio.cups_nombre = ' '
            } else {
              servicio.cups_codigo = Cita.Servicio.cups_codigo
              servicio.cups_nombre = Cita.Servicio.cups_nombre
            }
            
            const nFactura = {
              Sede: Cita.Sede._id,
              contribuyente_nombre: `${Cita.Paciente[0].nombre} ${Cita.Paciente[0].apellido}`,
              contribuyente_nit: Cita.Paciente[0].username || ' ',
              contribuyente_direccion: Cita.Paciente[0].direccion || ' ',
              cups_codigo: (servicio.cups_codigo || ' '),
              cups_nombre: (servicio.cups_nombre || ' '),
              Cita: Cita._id,
              pagado: false,
              valor_factura: Cita.valor_cita,
              valor_pagado: 0,
              Paciente: [Cita.Paciente[0]._id],
              creador: req.user._id,
              creado_timestamp: moment(new Date()).unix()
            }
            
            FacturaModel.create(nFactura, function (err, Factura) {
              if (err) {
                
                res.render('404', {
                  title: '500 Internal Server Error F',
                  user: req.user
                })
              } else {
                Cita.facturado = true
                Cita.Factura = Factura._id
                Cita.save(function (err, CitaNueva) {
                  if (err) {
                    res.render('404', {
                      title: '500 Internal Server Error CN',
                      user: req.user
                    })
                  } else {
                    res.redirect(`/facturas/crear?cita=${citaId}`)
                    // FacturaModel.findById(Factura._id, null, {
                    //   populate: 'Paciente'
                    // }, function (err, FacturaNueva) {
                    //   if (err) {
                    //     console.log('err')
                    //     res.render('404', {
                    //       title: '500 Internal Server Error FN',
                    //       user: req.user
                    //     })
                    //   } else {
                    //     var tituloHead = 'Generar Factura'
                    //     if (Factura.pagado === true) {
                    //       tituloHead = 'Revisar Factura'
                    //     }
                    //     res.render('facturas/crear', {
                    //       title: tituloHead,
                    //       user: req.user,
                    //       cie10: require('../lib/cie10'),
                    //       Factura: FacturaNueva,
                    //       Cita: CitaNueva
                    //     })
                    //   }
                    // })
                  }
                })
              }
            })
          } else {
            var tituloHead = 'Generar Factura'
            if (Factura.pagado === true) {
              tituloHead = 'Revisar Factura'
            }
            res.render('facturas/crear', {
              title: tituloHead,
              user: req.user,
              cie10: require('../lib/cie10'),
              Factura,
              Cita
            })
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
