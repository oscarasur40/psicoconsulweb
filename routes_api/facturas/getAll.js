var FacturaModel = require('../../models/FacturaModel')

module.exports = function (req, res) {
  const skip = parseInt(req.query.skip) || 0
  const limit = parseInt(req.query.limit) || 10
  const filter = req.query.filter || Object({})
  const projection = req.query.projection || null

  var sedesAsignadas = req.user.Sedes
  let sedeExistente = 0
  const sedesIds = sedesAsignadas.map(function (sede) {
    return String(sede._id)
  })
  sedeExistente = sedesIds.indexOf(String(req.body.Sede))

  console.log('projection= ', projection)
  if (sedeExistente < 0) {
    res.status(403).send({
      message: 'El id de la sede que envió no le pertenece.',
      body: req.body
    })
  } else {
    FacturaModel.find(filter, projection, {
      skip,
      limit
    }, function (err, Facturas) {
      if (err) {
        res.status(500).send({
          message: 'Error al buscar los Facturas.',
          error: err
        })
      } else {
        res.send(Facturas)
      }
    })
  }
}
