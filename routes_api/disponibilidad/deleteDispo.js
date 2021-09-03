var Disponibilidad = require('../../models/Disponibilidad')

module.exports = function (req, res) {
   
  var filter = {
    _id: req.params.id
  }

  Disponibilidad.deleteOne(filter,  function (err, Dispo) {
    if (err) {
      res.status(500).send({
        message: 'Error al buscar la disponibilidad.',
        error: err
      })
    } else {
      res.send(Dispo)
    }
  })

}