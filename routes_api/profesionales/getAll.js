const UserModel = require('../../models/UserModel')

module.exports = function (req, res) {
  var queryIn = {}
  const limit = parseInt(req.query.limit) || 10
  const skip = parseInt(req.query.skip) || 0
  // eslint-disable-next-line eqeqeq
  var projection = req.query.projection || ''
  if (projection.indexOf('-')) {
    projection = projection.split('salt').join(' ').split('password').join(' ')
  } else {
    projection = '-salt -password ' + projection
  }
  if (projection.split(' ').join('') === '') {
    projection = '-salt -password'
  }
  if (req.user.tipo === 'superadmin') {
    queryIn = {
      $or: [{ tipo: 'profesional' }, { tipo: 'adminsede' }]
    }
  } else {
    console.log(req.user.Sedes.map(function (sede) {
      return sede._id
    }))
    if (req.query.sede) {
      queryIn = {
        $or: [{ tipo: 'profesional' }, { tipo: 'adminsede' }],
        Sedes: {
          $in: req.query.sede
        }
      }
    } else {
      queryIn = {
        $or: [{ tipo: 'profesional' }, { tipo: 'adminsede' }],
        Sedes: {
          $in: req.user.Sedes.map(function (sede) {
            if(sede._id  == req.query.filter.sede){
              return sede._id
            }
          })
        }
      }
    }
  }
  console.log(">>> profesional Sede", queryIn)
  UserModel.find(queryIn, projection, function (err, dataUsers) {
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
