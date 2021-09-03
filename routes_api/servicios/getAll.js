var ServicioModel = require('../../models/ServicioModel')

module.exports = function (req, res) {
  const skip = parseInt(req.query.skip) || 0
  const limit = parseInt(req.query.limit) || 10
  const filter = req.query.filter || Object({})
  const projection = req.query.projection || null

  console.log('projection= ', projection)
  ServicioModel.find(filter, projection, {
    skip,
    limit
  }, function (err, Servicios) {
    if (err) {
      res.status(500).send({
        message: 'Error al buscar los Servicios.',
        error: err
      })
    } else {
      res.send(Servicios)
    }
  })
}
