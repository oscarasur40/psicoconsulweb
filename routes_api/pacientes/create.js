const UserModel = require('../../models/UserModel')
const ut = require('../../lib/userTools')

module.exports = function (req, res) {
  if (req.user.tipo === 'superadmin' || req.user.tipo === 'superadmin' || req.user.tipo === 'superadmin') {
    res.status(401).send({
      message: 'No tienes permiso para acceder a esta URI. Consulta con un Administrador'
    })
  } else {
    var pacienteObj = req.body
    const passRaw = req.body.password
    pacienteObj.salt = ut.createSalt()
    pacienteObj.password = ut.createHash(passRaw, pacienteObj.salt)
    pacienteObj.tipo = 'paciente'
    //console.log(pacienteObj)
    UserModel.create(pacienteObj, function (err, userCreado) {
      if (err) {
        console.log(err)
        // eslint-disable-next-line no-prototype-builtins
        if (err.code === 11000 && err.keyPattern.hasOwnProperty('username')) {
          res.status(409).send({
            message: `El usuario '${err.keyValue.username}' ya existe en el sitio.`,
            error: err
          })
        } else {
          console.log('err', err)
          res.status(500).send({
            message: 'Hubo un error al crear al Profesional.',
            error: err
          })
        }
      } else {
        userCreado.salt = null
        userCreado.password = null
        res.status(201).send(userCreado)
      }
    })
  }
}
