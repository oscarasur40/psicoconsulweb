var CitaModel = require('../../models/CitaModel')

module.exports = function (req, res) {
    console.log("Este es",req.user.roles )
if(req.user.tipo === 'adminsede'  || req.user.roles === 'SC' ){
    var filter = {
        Sede: req.query.sede,
    }
}else{
    var filter = {
        Sede: req.query.sede,
        Profesional:  String(req.user._id)
    }
}

  const projection = req.query.projection || null

  console.log(filter)
  CitaModel.find(filter, projection, function (err, Formularios) {
    if (err) {
      res.status(500).send({
        message: 'Error al buscar las citas.',
        error: err
      })
    } else {
      res.send(Formularios)
    }
  })
}
