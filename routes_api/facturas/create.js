const FacturaModel = require('../../models/FacturaModel')
const moment = require('moment')

module.exports = function (req, res) {
  var sedesAsignadas = req.user.Sedes
  let sedeExistente = 0
  const sedesIds = sedesAsignadas.map(function (sede) {
    return String(sede._id)
  })
  sedeExistente = sedesIds.indexOf(String(req.body.Sede))

  if (sedeExistente < 0) {
    res.status(403).send({
      message: 'El id de la sede que envió no le pertenece.',
      body: req.body
    })
  } else {
    var citaNueva = req.body
    citaNueva.creador = req.user._id




    citaNueva.creado_timestamp = moment(new Date()).utc().unix()
    FacturaModel.create(citaNueva, function (err, citaCreada) {
      if (err) {
        res.status(500).send({
          message: 'Error al crear la Sede.',
          error: err
        })
      } else {
        res.status(201).send(citaCreada)
      }
    })
  }
}
