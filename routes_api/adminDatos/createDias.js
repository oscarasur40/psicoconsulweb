const DiasModel = require('../../models/DiasModel')

module.exports = function (req, res) {

    DiasModel.find({dia_no_laboral: req.body.dia_no_laboral, Sede: req.body.Sede },function (err, dataUsers) {
      if (err) {
        res.status(500).send({
          message: 'Error al buscar todos los consultorios.',
          error: err
        })
        // eslint-disable-next-line eqeqeq
      } else if (dataUsers == '') {
        DiasModel.create(req.body, function (err, diaCreado) {
          if (err) {
            res.status(500).send({
              message: 'Error al crear el consultorio.',
              error: err
            })
          } else {
            res.status(201).send(diaCreado)
          }
        })        
      } else {
        res.status(403).send({
          message: 'El dia ya existe.',
          error: "El dia ya existe"
        })
      }
    })
}