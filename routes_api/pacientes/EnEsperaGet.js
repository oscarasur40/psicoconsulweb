const UserModel = require('../../models/UserModel')

module.exports = function (req, res) {
  const filter = req.query.filter || Object({})
    var queryIn = {}
    // const filter = req.query.filter || Object({})
    // console.log(filter)
    queryIn = {
        Sedes:  req.params.sede,
        EnEspera: true
    }
    console.log(queryIn)
    UserModel.find(queryIn,  
      function (err, user) {
        if (err) {
          res.status(500).send({
            message: 'Error al buscar todos los usuarios.',
            error: err
          })
        }
        
        res.send(user)
    });
}