const InformeModel = require('../../models/InformeModel')

module.exports = function (req, res) {
  if (req.user.tipo === 'superadmin' || req.user.tipo === 'superadmin' || req.user.tipo === 'superadmin') {
    res.status(401).send({
      message: 'No tienes permiso para acceder a esta URI. Consulta con un Administrador'
    })
  } else {
    var informeObj = req.body
    InformeModel.create(informeObj, function (err, informeCreado) {
      if (err) {
        console.log(err)
        res.status(500).send({
            message: 'Hubo un error al crear el informe.',
            error: err
        })
      } else {
        res.status(201).send(informeCreado)
      }
    })
  }
}