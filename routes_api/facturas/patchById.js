var FacturaModel = require('../../models/FacturaModel')

module.exports = function (req, res) {
  
  // var sedesAsignadas = req.user.Sedes
  // let sedeExistente = 0
  // const sedesIds = sedesAsignadas.map(function (sede) {
  //   return String(sede._id)
  // })
  // sedeExistente = sedesIds.indexOf(String(req.query.Sede))

  // if (sedeExistente < 0) {
  //   res.status(403).send({
  //     message: 'El id de la sede que envió no le pertenece.',
  //     body: req.body
  //   })
  // } else {
  FacturaModel.findOneAndUpdate({
    Sede: req.query.sede,
    _id: req.params.id
  }, { $set: req.body }, function (err, Factura) {
    if (err) {
      res.status(500).send({
        message: 'Error al actualizar el Factura.',
        error: err
      })
    } else {
      res.send(Factura)
    }
  })
  // }
}
