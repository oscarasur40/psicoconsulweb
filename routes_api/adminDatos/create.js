const Consultorios = require('../../models/Consultorios')

module.exports = function (req, res) {

    Consultorios.find({Consultorio: req.body.Consultorio, Sede: req.body.Sede },function (err, dataUsers) {
      if (err) {
        res.status(500).send({
          message: 'Error al buscar todos los consultorios.',
          error: err
        })
        // eslint-disable-next-line eqeqeq
      } else if (dataUsers == '') {
        Consultorios.create(req.body, function (err, ConsultorioCreado) {
          if (err) {
            res.status(500).send({
              message: 'Error al crear el consultorio.',
              error: err
            })
          } else {
            res.status(201).send(ConsultorioCreado)
          }
        })
      
            
      } else {
        res.status(403).send({
          message: 'El consultorio ya existe.',
          error: "El consultorio ya existe"
        })
      }
    })
}