var SedeModel = require('../../models/SedeModel')
var CitaModel = require('../../models/CitaModel')

module.exports = function (req, res) {
  SedeModel.findById(req.params.id, function (err, sedes) {
    if (err) {
      res.status(500).send({
        message: 'Error al buscar las Sedes.',
        error: err
      })
    } else if (sedes === null) {
      res.status(404).send({})
    } else {
      console.log(">>>> Sedes: ", sedes._id)
      res.send(sedes)
      // let queryIn = {
      //   Sedes: {
      //     $in: sedes._id
      //   }
      // }
      // if(sedes.nombre === "2020")
      // {  
      //   CitaModel.findById(queryIn, function(err, cita) {
      //     if (err) {
      //       res.status(500).send({
      //         message: 'Error al buscar las Sedes.',
      //         error: err
      //       })
      //     }
      //     let data = {
      //       sede: sedes,
      //       cita: cita
      //     }
      //     console.log(">>> data: ", data)
      //     res.send(data)
      //   })
      // } else {
      //   res.send(sedes)
      // }
     }
  })
}
