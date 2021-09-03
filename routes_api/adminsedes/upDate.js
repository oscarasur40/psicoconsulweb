const UserModel = require('../../models/UserModel')

module.exports = function (req, res){
    if (req.user.tipo !== 'superadmin') {
        res.status(401).send({
          message: 'No tienes permiso para acceder a esta URI. Consulta con un Administrador'
        })
      // eslint-disable-next-line eqeqeq
    }else{
        UserModel.update({ _id:req.body.user_id}, 
            { $set: req.body }, 
            function (err, adminCreate) {
            if (err) {
              console.log(err)
              res.status(500).send({
                message: 'Error al actualizar',
                error: err
              })
            } else {
              res.status(201).send(adminCreate)
            }
          })
    }

}