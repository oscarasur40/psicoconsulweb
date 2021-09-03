var FormularioModel = require('../../models/FormularioModel')

module.exports = function (req, res) {
  const skip = parseInt(req.query.skip) || 0
  const limit = parseInt(req.query.limit) || 10
  const filter = req.query.filter || Object({})
  var idSedesPermitidas = req.user.Sedes.map(function (Sede) {
    return Sede._id
  })
  
  if (idSedesPermitidas.includes(req.query.filter.Sede)) {
    FormularioModel.find(filter, null, {
      skip,
      limit
    }, function (err, Formularios) {
      if (err) {
        res.status(500).send({
          message: 'Error al buscar los Formularios.',
          error: err
        })
      } else {
        res.send(Formularios)
      }
    })
  } else {
    res.status(401).status({
      message: 'No tiene permitido acceder a estos formularios.'
    })
  }
}
