const HistoriaClinicaModel = require('../../models/HistoriaClinicaModel')

module.exports = function (req, res) {
    var queryIn = {
        Paciente: [ req.user._id ],
        Sede: req.user.Sedes[0]._id,
    }

    HistoriaClinicaModel.find(queryIn, function (err, Firmadocument) {
      if (err) {
        res.status(500).send({
          message: 'Error al cargar informacion de citas por paciente.',
          error: err
        })
      } else {
        res.status(201).send(Firmadocument)
      }
    })
}
