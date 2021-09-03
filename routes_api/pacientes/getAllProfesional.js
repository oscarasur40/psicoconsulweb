const UserModel = require('../../models/UserModel')

function getUsers (limit, skip, filter, projection, res) {
  if (projection.indexOf('-')) {
    projection = projection.split('salt').join(' ').split('password').join(' ')
  } else {
    projection = '-salt -password ' + projection
  }
  if (projection.split(' ').join('') === '') {
    projection = '-salt -password'
  }
  console.log(typeof projection, projection, projection === '')
  delete filter.sede
  console.log(limit, skip, filter, projection)
  UserModel.find(filter, projection, function (err, dataUsers) {
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
module.exports = function (req, res) {
  const limit = parseInt(req.query.limit) || 10
  const skip = parseInt(req.query.skip) || 0
  const filter = req.query.filter || ''
  const projection = req.query.projection || ''
  filter.tipo = 'paciente'
  const Sede = req.query.filter.sede
  const Profesional = req.query.filter.idProfesional
  const SedesUser = req.user.Sedes.map(item => {
    return item._id
  })
  console.log(typeof Sede, Sede, typeof SedesUser, SedesUser)

  if (req.user.tipo === 'superadmin') {
    if (Sede) {
      filter.Sedes = Sede
    }
    getUsers(limit, skip, filter, projection, res)
  } else if (['profesional', 'adminsede'].includes(req.user.tipo)) {
    if (SedesUser.includes(Sede)) {
      filter.Sedes = Sede
      getUsers(limit, skip, filter, projection, res)
    } else {
      res.status(401).send({
        message: 'No esta autorizado para buscar pacientes en esta sede.'
      })
    }
  } else {
    res.status(401).send({
      message: 'No esta autorizado para buscar pacientes en esta sede.'
    })
  }
}
