var DiasModel = require('../../models/DiasModel')

module.exports = function (req, res) {
   
  var filter = {
    _id: req.params.id
  }

  DiasModel.deleteOne(filter,  function (err, Cita) {
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