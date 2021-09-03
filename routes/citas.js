
var express = require('express')
const HistoriaClinicaModel = require('../models/HistoriaClinicaModel')
const CitaModel = require('../models/CitaModel')
const FormularioModel = require('../models/FormularioModel')
const userModel = require('../models/UserModel')
const CargueDocumentoModel = require('../models/CargueDocumentoModel')

var router = express.Router()

router.get('/', function (req, res, next) {
  
  if(req.user.tipo === "paciente") {
    res.render('citas/citasPacientes', {
      title: 'Citas Pacientes',
      user: req.user,
      sede_id: req.user.Sedes,
    })
  }else {
    res.render('citas/index', {
      title: 'Citas',
      user: req.user,
      sede_id: req.user.Sedes,
    })
  }

})
router.get('/indexUni', function (req, res, next) {
  const pacienteID = req.query.paciente || null
  console.log("tipo : ", req.user.tipo)
  userModel.findById(pacienteID, function(err, paciente){
    if(err){
      res.render('404', {
        title: '404 Not Found',
        user: req.user
      })

    }else{  
  if(req.user.tipo === "paciente") {
    res.render('citas/citasPacientes', {
      title: 'Citas Pacientes',
      user: req.user,
      sede_id: req.user.Sedes,
    })
  }else {
    res.render('citas/indexUni', {
      title: 'Citas Uni',
      user: req.user,
      sede_id: req.user.Sedes,
      paciente: paciente
    })
  }
}
})
})

router.get('/atender', function (req, res, next) {
  const citaId = req.query.cita || null
  if (citaId) {
    CitaModel.findById(citaId, function (err, Cita) {
      const ProfEsDeCita = String(Cita.Profesional._id) == String(req.user._id)
      const supervisor = String(Cita.Profesional.supervisorAsign) == String(req.user._id)
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
                  cita_cerrada_timestamp: Math.floor(new Date().getTime()/1000),
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
                      cups: require('../lib/CUPS'),
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
            
            console.log("403 en 403 citas: ", ProfEsDeCita, HistoriaClinica.cerrado, supervisor)
            if (ProfEsDeCita || HistoriaClinica.cerrado || supervisor) {
              res.render('citas/atender/index', {
                title: tituloHead,
                user: req.user,
                cie10: require('../lib/cie10'),
                cups: require('../lib/CUPS'),
                HistoriaClinica,
                Cita
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

router.get('/formularioPrimeraVez', function (req, res, next) {
  const idPrimeraVez = req.query.cita || null
  
  CitaModel.findById(idPrimeraVez, function (err, Cita) {
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
      HistoriaClinicaModel.findOne({ Cita: idPrimeraVez }, function (err, HistoriaClinica) {
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
                cita_cerrada_timestamp: Math.floor(new Date().getTime() / 1000),
                cerrado: false,
                closePrimeraVez: false
              }, function (err, HistoriaClinica) {
                if (err) {
                  res.render('404', {
                    title: '500 Internal Server Error',
                    user: req.user
                  })
                }

                console.log("Tu Id: ", Cita.Paciente[0]._id)
                CargueDocumentoModel.find({ Paciente: Cita.Paciente[0]._id }, function (err, Documentos) {
                  if(err){
                    res.render('404', {
                      title: '500 Internal Server Error',
                      user: req.user
                    })
                    console.log("Estoy entrando al error")
                  }else{
                    let valDcoument = false
                    var contado = 0;
                    for(i=0;i<Documentos.length;i++){
                    var docu = Documentos[i]
                    if(docu.tipoDocumento == 'CONSENTIMIENTO INFORMADO'){
                        contado++
                    }
                    if(docu.tipoDocumento == 'Fotocopia de cédula (de los integrantes)'){
                        contado++
                    }
                    if(docu.tipoDocumento == 'Autorizacionción de datos personales'){
                        contado++
                    }
                    }
                    if(contado >= 3){
                       valDcoument = true;
                    } 
                      res.render('citas/formularioPrimeraVez', {
                        title: 'Formulario Primera Vez',
                        user: req.user,
                        paciente: Cita.Paciente,
                        cie10: require('../lib/cie10'),
                        HistoriaClinica,
                        Cita,
                        documentUser: valDcoument
                      })
                  }
                })
                
              })
            }
          })
        } else {
          console.log("Tu Id: ", Cita.Paciente[0]._id)
          CargueDocumentoModel.find({ Paciente: Cita.Paciente[0]._id }, function (err, Documentos) {
            if(err){
              res.render('404', {
                title: '500 Internal Server Error',
                user: req.user
              })
              console.log("Estoy entrando al error")
            }else{
              let valDcoument = false;
              var contado = 0;
              for(i=0;i<Documentos.length;i++){
                var docu = Documentos[i]
                if(docu.tipoDocumento == 'CONSENTIMIENTO INFORMADO'){
                    contado++
                }
                if(docu.tipoDocumento == 'Fotocopia de cédula (de los integrantes)'){
                    contado++
                }
                if(docu.tipoDocumento == 'Autorizacionción de datos personales'){
                    contado++
                }
                }
                if(contado >= 3){
                   valDcoument = true;
                } 
                res.render('citas/formularioPrimeraVez', {
                  title: 'Formulario Primera Vez',
                  user: req.user,
                  paciente: Cita.Paciente,
                  cie10: require('../lib/cie10'),
                  HistoriaClinica,
                  Cita,
                  documentUser: valDcoument
                })
            }
          })
        }
      })
    }
    
  });
})

router.get('/sessionU', function (req, res, next) {
  const idPrimeraVez = req.query.cita || null
  
  CitaModel.findById(idPrimeraVez, function (err, Cita) {
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
      HistoriaClinicaModel.findOne({ Cita: idPrimeraVez }, function (err, HistoriaClinica) {
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
                cita_cerrada_timestamp: Math.floor(new Date().getTime() / 1000),
                cerrado: false,
                closePrimeraVez: false
              }, function (err, HistoriaClinica) {
                if (err) {
                  res.render('404', {
                    title: '500 Internal Server Error',
                    user: req.user
                  })
                }
                           
                res.render('citas/sessionU', {
                  title: 'Session',
                  user: req.user,
                  paciente: Cita.Paciente,
                  cie10: require('../lib/cie10'),
                  HistoriaClinica,
                  Cita
                })
                
              }) 
            }
          })
        } else {
          res.render('citas/sessionU', {
            title: 'Session',
            user: req.user,
            paciente: Cita.Paciente,
            cie10: require('../lib/cie10'),
            HistoriaClinica,
            Cita
          })
        }
      })
    }
  })
  
})

module.exports = router