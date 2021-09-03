const RemisionModel = require('../../models/RemisionModel')

module.exports = function (req, res) {
  console.log(">>>>>", req.body)
    RemisionModel.create(req.body, function (err, remiCreada) {
    if (err) {
      res.status(500).send({
        message: 'Error al crear la remision.',
        error: err
      })
    } else {
      res.status(201).send(remiCreada)
    }
  })
}