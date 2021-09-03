var SedeModel = require('../../models/SedeModel')

module.exports = function (req, res) {
  const skip = parseInt(req.query.skip) || 0
  const limit = parseInt(req.query.limit) || 10
  const filter = req.query.filter || Object({})

  SedeModel.find(filter, null, {
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
