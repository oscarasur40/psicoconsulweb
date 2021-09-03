const SedeModel = require('../../models/SedeModel')

module.exports = function (req, res) {
  SedeModel.create(req.body, function (err, sedeCreada) {
    if (err) {
      res.status(500).send({
        message: 'Error al crear la Sede.',
        error: err
      })
    } else {
      res.status(201).send(sedeCreada)
    }
  })
}
