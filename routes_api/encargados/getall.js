var EncargadoModel = require('../../models/EncargadoModel')

module.exports = function (req, res) {
  var skip = req.query.skip || 0
  var limit = req.query.limit || 10

  EncargadoModel.find({}, null, {
    skip,
    limit
  }, function (err, sedes) {
    if (err) {
      res.status(500).send({
        message: 'Error al buscar las Sedes.',
        error: err
      })
    } else {
      res.send(sedes)
    }
  })
}
