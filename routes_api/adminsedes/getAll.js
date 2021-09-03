const UserModel = require('../../models/UserModel')

module.exports = function (req, res, next) {
  const limit = parseInt(req.query.limit) || 10
  const skip = parseInt(req.query.skip) || 0
  UserModel.find({ tipo: 'adminsede' }, '-salt -password', {
    limit,
    skip
  },
  function (err, dataUsers) {
    if (err) {
      res.status(500).send({
        message: 'Error al buscar todos los usuarios.',
        error: err
      })
      // eslint-disable-next-line eqeqeq
    } else if (dataUsers == undefined) {
      res.status(404).send([])
    } else {
      res.send(dataUsers)
    }
  })
}
