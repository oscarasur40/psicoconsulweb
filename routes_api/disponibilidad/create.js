const Disponibilidad = require('../../models/Disponibilidad')

module.exports = function (req, res) {
  const limit = parseInt(req.query.limit) || 10
  const skip = parseInt(req.query.skip) || 0
  var projection = req.query.projection || ''
  var disponibilidad = req.body
    console.log(req.body.calendario)
    Disponibilidad.find({calendario: req.body.calendario}, projection, {
      limit,
      skip
    },
    function (err, dataUsers) {
      if (err) {
        res.status(500).send({
          message: 'Error al buscar todos las disponibilidades.',
          error: err
        })
        // eslint-disable-next-line eqeqeq
      } else if (dataUsers == '') {
            Disponibilidad.create(disponibilidad, function (err, disponibilidadCreado) {
              if (err) {
                res.status(500).send({
                  message: 'Error al crear la disponibilidad',
                  error: err
                })
              } else {
                res.status(201).send(disponibilidadCreado)
              }
            })
            
      } else {
        res.status(403).send({
          message: 'La Disponibilidad Escogida Ya Se Encuentra En Uso.',
          error: "La Disponibilidad Escogida Ya Se Encuentra En Uso"
        })
      }
    })

  
}