const CierreModel = require('../../models/CierreModel')

module.exports = function (req, res) {
  if (req.user.tipo === 'superadmin' || req.user.tipo === 'superadmin' || req.user.tipo === 'superadmin') {
    res.status(401).send({
      message: 'No tienes permiso para acceder a esta URI. Consulta con un Administrador'
    })
  } else {
    var cierreObj = req.body
    CierreModel.create(cierreObj, function (err, cierreCreado) {
      if (err) {
        console.log(err)
        res.status(500).send({
            message: 'Hubo un error al crear el informe.',
            error: err
        })
      } else {
        res.status(201).send(cierreCreado)
      }
    })
  }
}