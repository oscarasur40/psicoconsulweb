const UserModel = require('../../models/UserModel')
const ut = require('../../lib/userTools')

module.exports = function (req, res) {
  var pacienteObj = req.body
  console.log(pacienteObj)
  var data = {
    EnEspera: pacienteObj.EnEspera
  }
  UserModel.update({_id: pacienteObj.paciente}, 
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