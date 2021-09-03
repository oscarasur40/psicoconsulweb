const UserModel = require('../../models/UserModel')

module.exports = function (req, res) {
  UserModel.findById(req.params.id, '-salt -password', function (err, dataUser) {
    if (err) {
      res.status(400).send({
        message: 'Error al buscar el usuario.',
        error: err
      })
      // eslint-disable-next-line eqeqeq
    } else if (dataUser == null) {
      res.status(404).send({})
    } else if (dataUser.tipo === 'superadmin') {
      res.status(404).send({})
    } else {
      res.send(dataUser)
    }
  })
}
