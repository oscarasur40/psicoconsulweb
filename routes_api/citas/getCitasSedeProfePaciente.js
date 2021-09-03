var CitasModel = require('../../models/CitaModel')

module.exports = function (req, res) {

  const filter = {
    Sede: req.params.sede,
    Profesional:  req.params.profesional,
    Paciente : req.params.paciente,
    estado: 'Programada'
  }
  const projection = req.query.projection || null

  
  CitasModel.find(filter, projection, function (err, citas) {
    if (err) {
      res.status(500).send({
        message: 'Error al buscar las citas.',
        error: err
      })
    } else {
      res.send(citas)
    }
  })
}