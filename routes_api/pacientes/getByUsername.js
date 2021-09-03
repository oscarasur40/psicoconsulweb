var UserModel = require('../../models/UserModel')

module.exports = function (req, res) {
  const projection = req.query.projection || null
  UserModel.findOne({ username: req.params.username, tipo: 'paciente' }, projection, function (err, paciente) {
    console.log(paciente)
    if (err) {
      res.status(500).send({
        message: 'Error al buscar al paciente.',
        error: err
      })
    } else if (paciente === null) {
      res.status(404).send({})
    } else {
      res.send(paciente)
    }
  })
}