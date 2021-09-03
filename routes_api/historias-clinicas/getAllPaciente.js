var HistoriaClinicaModel = require('../../models/HistoriaClinicaModel')

module.exports = function (req, res) {
    var filter ={
        Sede: req.params.sede,
        Paciente: req.params.id
    }
    HistoriaClinicaModel.find(filter, function (err, Citas) {
      if (err) {
        res.status(500).send({
          message: 'Error al buscar los Citas.',
          error: err
        })
      } else {
        res.send(Citas)
      }
    })
  
}