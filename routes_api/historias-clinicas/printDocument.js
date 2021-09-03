var HistoriaClinicaModel = require('../../models/HistoriaClinicaModel')

module.exports = function (req, res) {
  //console.log(req.body)
  let ids = req.body.id
  let sede = req.body.sede
  let userId = req.body.user_id
  var queryIn = {}

    //   "Paciente" : [ ObjectId("5f6293391285e500079fdc40")], 
    //     "Sede": ObjectId("5f5a20cc735f3500074b3b1a"),    
    //     "Cita": { $in: [ObjectId("5f64e7ea5179db0007c7d9e6"), ObjectId("5f63512b34e198000768e8ef")]}
    var arrayId = ''
    var count = 1
    for(let d in ids){
        count++
        arrayId += ids[d] + ','
    }
    queryIn = {
        Paciente : [ userId ],
        Sede: {
            $in: [ sede ]
          },
        Cita: {
            $in: Object.values(arrayId.split(',').slice(0, count - 1))
        }
    }
  HistoriaClinicaModel.find(queryIn, function (err, HistoriaClinica) {
    if (err) {
        console.error(err)
      res.status(500).send({
        message: 'Error al imprimir Historia Clinica',
        error: err
      })
    } else {
        console.log(HistoriaClinica)
      res.send(HistoriaClinica)
    }
  })
}
