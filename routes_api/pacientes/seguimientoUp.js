const SeguimientoModel = require('../../models/SeguimientoModel')
const ut = require('../../lib/userTools')
module.exports = function (req, res) {
    var pacienteObj = req.body
    
  
    
    console.log("Seguimiento", pacienteObj)
    var data = {
        percepcion: pacienteObj.percepcion,
        cambiosIdentificados: pacienteObj.cambiosIdentificados,
        proyectosFuturos: pacienteObj.proyectosFuturos,
        observacionesPsicologo: pacienteObj.observacionesPsicologo
    }
    console.log("TOMA TU ID", pacienteObj._id )
    SeguimientoModel.update({ _id: pacienteObj._id}, 
      { $set: data }, 
     
      function (err, SeguimientoUp) {
      if (err) {
        console.log(err)
        res.status(500).send({
          message: 'Error al actualizar el Profesional',
          error: err
        })
      } else {
        res.status(201).send("Funciono Resumen")
      }
    })
  }