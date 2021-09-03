const HistoriaClinicaModel = require('../../models/HistoriaClinicaModel')
const moment = require('moment')

module.exports = function (req, res) {
  console.log("Entro en esta vaina!!!")
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
    var historiaNueva = req.body
    historiaNueva.creador = req.user._id

    historiaNueva.creado_timestamp = moment(new Date()).utc().unix()
    console.log(historiaNueva)
    // Sede: Cita.Sede._id,
    //               Cita: Cita._id,
    //               formulario: Formulario,
    //               datos_formulario: Object({}),
    //               Paciente: Cita.Paciente,
    //               Profesional: Cita.Profesional,
    //               cita_cerrada_timestamp: moment(new Date()).unix(),
    //               cerrado: false
    HistoriaClinicaModel.create(historiaNueva, function (err, historiaCreada) {
      console.log(err)
      if (err) {
        res.status(500).send({
          message: 'Error al crear la Sede.',
          error: err
        })
      } else {
        res.status(201).send(historiaCreada)
      }
    })
  }
}
