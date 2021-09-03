const FormularioModel = require('../../models/FormularioModel')

module.exports = function (req, res) {
  var sedesAsignadas = req.user.Sedes
  let sedeExistente = 0
  if (req.user.tipo === 'adminsede') {
    const sedesIds = sedesAsignadas.map(function (sede) {
      return String(sede._id)
    })
    sedeExistente = sedesIds.indexOf(String(req.body.Sede))
  }
  if (sedeExistente < 0) {
    res.status(403).send({
      message: 'El id de la sede que envió no le pertenece.',
      body: req.body
    })
  } else {
    var formulario = req.body
    formulario.creador = req.user._id
    FormularioModel.create(req.body, function (err, formularioCreado) {
      if (err) {
        res.status(500).send({
          message: 'Error al crear la Sede.',
          error: err
        })
      } else {
        res.status(201).send(formularioCreado)
      }
    })
  }
}
