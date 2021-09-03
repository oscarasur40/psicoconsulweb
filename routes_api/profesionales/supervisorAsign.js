const UserModel = require('../../models/UserModel')

module.exports = function (req, res) {
  var queryIn = {}
  var datos = req.params
  const filter = req.query.filter || null
  console.log('filter', filter)
  // eslint-disable-next-line eqeqeq
  queryIn={
    Sedes: datos.sede,
    supervisorAsign: datos.supervisorAsign
  }

  console.log(">>> profesional Sede", queryIn)
  UserModel.find(queryIn, filter, function (err, dataUsers) {
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
