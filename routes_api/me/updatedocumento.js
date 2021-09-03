const cargueDoucmentModel = require('../../models/CargueDocumentoModel');

module.exports = function (req, res) {
  
    var pacienteObj = req.query
    console.log(pacienteObj)
    queryIn = {
        $or: [{ tipo: 'profesional' }, { tipo: 'adminsede' }],
        Sedes: {
          $in: req.user.Sedes.map(function (sede) {
            return sede._id
          })
        }
      }

  cargueDoucmentModel.find({queryIn}, 
    function (err, dataTodoLists) {
    if (err) {
      res.status(500).send(err)
    } else if (dataTodoLists == null) {
      res.status(404).send({})
    } else {
      res.status(200).send(dataTodoLists)
    }
  })
}
