const RecepcionPaciente = require('../../models/RecepcionPaciente')

module.exports = function (req, res) {
  if (req.user.tipo === 'superadmin' || req.user.tipo === 'superadmin' || req.user.tipo === 'superadmin') {
    res.status(401).send({
      message: 'No tienes permiso para acceder a esta URI. Consulta con un Administrador'
    })
  } else {
    var recepcionObj = req.body
    RecepcionPaciente.create(recepcionObj, function (err, userCreado) {
      if (err) {
        console.log(err)
        res.status(500).send({
            message: 'Hubo un error al crear al Profesional.',
            error: err
        })
      } else {
        res.status(201).send(userCreado)
      }
    })
  }
}