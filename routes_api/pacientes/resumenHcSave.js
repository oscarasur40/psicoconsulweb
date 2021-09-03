const ResumenHcModel = require('../../models/ResumenHcModel')

module.exports = function (req, res) {
  if (req.user.tipo === 'superadmin' || req.user.tipo === 'superadmin' || req.user.tipo === 'superadmin') {
    res.status(401).send({
      message: 'No tienes permiso para acceder a esta URI. Consulta con un Administrador'
    })
  } else {
    var resumenHcObj = req.body
    ResumenHcModel.create(resumenHcObj, function (err, resumenCreado) {
      if (err) {
        console.log(err)
        res.status(500).send({
            message: 'Hubo un error al crear al Profesional.',
            error: err
        })
      } else {
        res.status(201).send(resumenCreado)
      }
    })
  }
}