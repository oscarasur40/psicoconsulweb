const userTools = require('../../lib/userTools')
const UserModel = require('../../models/UserModel')
const { createHash } = require('../../lib/userTools')

module.exports = function (req, res) {
  console.log(req.user)
  if (req.body.password_nuevo === req.body.password_nuevo_repeat) {
    UserModel.findById(req.user._id, 'salt password', function (err, usuario) {
      if (err) {
        req.status(500).send({
          message: 'Error al encontrar tu usuario. Vuelve a Intentarlo.',
          error: err
        })
      } else if (usuario.password === createHash(req.body.password_actual, usuario.salt)) {
        const salt = userTools.createSalt()
        const password = userTools.createHash(req.body.password_nuevo, salt)
        UserModel.findByIdAndUpdate(req.user._id, {
          $set: {
            salt,
            password
          }
        }, function (err, usuario) {
          if (err) {
            res.status(500).send({
              message: 'Error al cambiar la contraseña. Vuelve a intentarlo.',
              error: err
            })
          } else {
            res.status(200).send({
              message: 'Contraseña cambiada con éxito.'
            })
          }
        })
      } else {
        res.status(400).send({
          message: 'La contraseña actual no es correcta.'
        })
      }
    })
  } else {
    res.status(400).send({
      message: 'La contraseña nueva no coincide con la repetición.'
    })
  }
}
