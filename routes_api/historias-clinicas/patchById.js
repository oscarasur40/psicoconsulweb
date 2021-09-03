var HistoriaClinicaModel = require('../../models/HistoriaClinicaModel')

module.exports = function (req, res) {
  console.log(req.body)
  HistoriaClinicaModel.findByIdAndUpdate(req.params.id, { $set: req.body }, function (err, HistoriaClinica) {
    if (err) {
      res.status(500).send({
        message: 'Error al actualizar la Historia Clinica.',
        error: err
      })
    } else {
      res.send(HistoriaClinica)
    }
  })
}
