const UserModel = require('../../models/UserModel')

module.exports = function (req, res) {
  var queryIn = {}
  var datos = req.body
  queryIn={
    foto_perfil: datos.foto_perfil
  }

  console.log(">>> profesional Sede", queryIn)
  UserModel.update({_id: datos.user_id}, 
    { $set: queryIn }, 
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