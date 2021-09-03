var CitaModel = require('../../models/CitaModel')

module.exports = function (req, res) {
   
  var filter = {
    _id: req.params.id
  }

  CitaModel.deleteOne(filter,  function (err, Cita) {
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