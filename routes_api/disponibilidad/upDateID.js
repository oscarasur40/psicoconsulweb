const Disponibilidad = require('../../models/Disponibilidad')
const ut = require('../../lib/userTools')

module.exports = function (req, res) {
  var dispo = req.body
  console.log(dispo)
  var data = {
    activo : dispo.activo
  }
  Disponibilidad.update({_id: dispo.id}, 
    { $set: data }, 
    { upsert: true }, 
    function (err, userCreado) {
    if (err) {
      console.log(err)
      res.status(500).send({
        message: 'Error al actualizar el Profesional',
        error: err
      })
    } else {
      res.status(201).send(userCreado)
    }
  })
}