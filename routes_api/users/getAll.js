const UserModel = require('../../models/UserModel')

module.exports = function (req, res, next) {
  let findQuery = {}
  const limit = parseInt(req.query.limit) || 10
  const skip = parseInt(req.query.skip) || 0

  switch (req.user.tipo) {
    case 'superadmin':
      findQuery = {
        username: {
          $ne: req.user.username
        }
      }
      break
    case 'adminsede':
      findQuery = {
        Sedes: req.user.Sedes,
        username: {
          $ne: req.user.username
        }
      }
      break
    case 'profesional':
      findQuery = {
        Sedes: req.user.Sedes,
        tipo: 'paciente',
        username: {
          $ne: req.user.username
        }
      }
      break
    default:
      findQuery = {
        Encargados: req.user.Encargados,
        username: {
          $ne: req.user.username
        }
      }
      break
  }

  UserModel.find(findQuery, '-salt -password', {
    limit,
    skip
  },
  function (err, dataUsers) {
    console.log('err: ', err, 'data: ', dataUsers)
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
