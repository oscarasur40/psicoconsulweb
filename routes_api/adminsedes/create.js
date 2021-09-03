const UserModel = require('../../models/UserModel')
const ut = require('../../lib/userTools')

module.exports = function (req, res) {
  if (req.user.tipo !== 'superadmin') {
    res.status(401).send({
      message: 'No tienes permiso para acceder a esta URI. Consulta con un Administrador'
    })
  // eslint-disable-next-line eqeqeq
  } else if (req.body.password == undefined || req.body.password === '') {
    res.status(500).send({
      message: 'Hubo un error al crear al Administrador de Sede.',
      error: {
        errors: {
          password: {
            message: 'El password es obligatorio.'
          }
        }
      }
    })
  } else {
    var adminSedeObj = req.body
    const passRaw = req.body.password
    adminSedeObj.salt = ut.createSalt()
    adminSedeObj.password = ut.createHash(passRaw, adminSedeObj.salt)
    adminSedeObj.tipo = 'adminsede'
    UserModel.create(adminSedeObj, function (err, userCreado) {
      if (err) {
        
        // eslint-disable-next-line no-prototype-builtins
        if (err.code === 11000 && err.keyPattern.hasOwnProperty('username')) {
          res.status(409).send({
            message: `El usuario '${err.keyValue.username}' ya existe en el sitio.`,
            error: err
          })
        } else {
          
          res.status(500).send({
            message: 'Hubo un error al crear al Administrador de Sede.',
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
