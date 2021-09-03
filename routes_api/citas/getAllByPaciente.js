var CitaModel = require('../../models/CitaModel')

module.exports = function (req, res) {
  const filter = {
    Sede: req.query.sede,
    Paciente:  [String(req.user._id)]
  }
  const projection = req.query.projection || null

  
  CitaModel.find(filter, projection, function (err, Formularios) {
    if (err) {
      res.status(500).send({
        message: 'Error al buscar las citas.',
        error: err
      })
    } else {
      res.send(Formularios)
    }
  })
}
