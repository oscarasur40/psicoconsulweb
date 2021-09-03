var ServicioModel = require('../../models/ServicioModel')

module.exports = function (req, res) {
  console.log(req.body)
  ServicioModel.findByIdAndUpdate(req.params.id, { $set: req.body }, function (err, Servicio) {
    if (err) {
      res.status(500).send({
        message: 'Error al actualizar el servicio.',
        error: err
      })
    } else {
      res.send(Servicio)
    }
  })
}
