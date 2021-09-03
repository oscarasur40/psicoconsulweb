const SeguimientoModel = require('../../models/SeguimientoModel')

module.exports = function (req, res) {
  if (req.user.tipo === 'superadmin' || req.user.tipo === 'superadmin' || req.user.tipo === 'superadmin') {
    res.status(401).send({
      message: 'No tienes permiso para acceder a esta URI. Consulta con un Administrador'
    })
  } else {
    var seguimientoObj = req.body
    SeguimientoModel.create(seguimientoObj, function (err, seguimiento) {
      if (err) {
        console.log(err)
        res.status(500).send({
            message: 'Hubo un error al crear el informe.',
            error: err
        })
      } else {
        res.status(201).send(seguimiento)
      }
    })
  }
}