const UserModel = require('../../models/UserModel')

module.exports = function (req, res) {
  var queryIn = {}
  var datos = req.params
  queryIn={
    Sedes: datos.sede,
    supervisorAsign: datos.supervisor
  }

  console.log(">>> profesional Sede", queryIn)
  UserModel.find(queryIn, function (err, dataUsers) {
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