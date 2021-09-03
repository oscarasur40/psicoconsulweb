const UserModel = require('../../models/UserModel')

module.exports = function (req, res, next) {
  UserModel.findOne({
    tipo: 'superadmin'
  }, function (err, superuser) {
    console.log('superuser', superuser)
    console.log('err', err)
    if (err) {
      res.status(500).send({
        message: 'Hubo un error en el servidor...'
      })
    // eslint-disable-next-line eqeqeq
    } else if (superuser == undefined) {
      const superadmin = {
        username: 'superadmin',
        salt: '3bff5932657b2f37f48ff36ad36c62e5',
        password: '3317cabf8cfcc6fa99fd5c02287be1f9c349a5ebdc33a388c6732a98bea1e1703038b75f7962e4b23a04874d79ffe682a381773b4e86591a8cbcaf42760a3af6',
        nombre: 'superadmin',
        tipo: 'superadmin'
      }
      UserModel.create(superadmin, function (err, superadmin) {
        if (err) {
          console.log('err', err)
          res.status(500).send({
            message: 'Hubo un error al crear al superadmin.',
            error: err
          })
        } else {
          res.status(201).send({
            message: 'usuario superadmin creado.'
          })
        }
      })
    } else {
      res.status(404).send({
        message: 'Esta URL no existe.'
      })
    }
  })
}
