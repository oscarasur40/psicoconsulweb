var CitaModel = require('../../models/CitaModel')

module.exports = function (req, res) {
  
  CitaModel.findByIdAndUpdate(req.params.id, { $set: req.body }, function (err, Cita) {
    if (err) {
      res.status(500).send({
        message: 'Error al actualizar el Cita.',
        error: err
      })
    } else {
      res.send(Cita)
    }
  })
}
