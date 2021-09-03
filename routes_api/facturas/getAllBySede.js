var FacturaModel = require('../../models/FacturaModel')

module.exports = function (req, res) {
  const filter = {
    Sede: req.query.sede
  }
  const projection = req.query.projection || null

  FacturaModel.find(filter, projection, function (err, Facturas) {
    if (err) {
      res.status(500).send({
        message: 'Error al buscar las citas.',
        error: err
      })
    } else {
      res.send(Facturas)
    }
  })
}
