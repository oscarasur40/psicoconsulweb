const userModel = require('../../models/UserModel')

module.exports = function (req, res) {
  var updateBody = req.body

  delete updateBody._id
  delete updateBody.username
  delete updateBody.salt
  delete updateBody.password
  delete updateBody.tipo
  delete updateBody.Sedes
  delete updateBody.SedeUserInfos
  delete updateBody.Encargados
  delete updateBody.GSS
  delete updateBody.limite_profesionales_asignar
  delete updateBody.limite_sedes_crear
  delete updateBody.limite_profesionales_por_sede
  delete updateBody.limite_pacientes_por_sede
  delete updateBody.membresia_tipo
  delete updateBody.membresia_precio
  delete updateBody.membresia_finaliza

  userModel.findByIdAndUpdate(req.user._id, {
    $set: updateBody
  }, {
    new: true
  }, function (err, dataTodoLists) {
    if (err) {
      res.status(500).send(err)
    } else if (dataTodoLists == null) {
      res.status(404).send({})
    } else {
      res.status(200).send(dataTodoLists)
    }
  })
}
