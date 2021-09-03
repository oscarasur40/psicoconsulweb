const UserModel = require('../../models/UserModel')

module.exports = function (req, res) {
    var queryIn = {}

    queryIn = {
        roles: 'PG', 
        Sedes: [ req.params.sede ]
    }
    
    UserModel.find(queryIn, {"calendario": 1, "_id": 1, "nombre": 1, "apellido": 1, "username": 1},
      function (err, dataUsers) {
        if (err) {
          res.status(500).send({
            message: 'Error al buscar todos los usuarios.',
            error: err
          })
        }
        
        res.send(dataUsers)
    });
}