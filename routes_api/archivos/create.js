const ArchivoModel = require('../../models/ArchivoModel')

module.exports = function (req, res) {
  var sedesAsignadas = req.user.Sedes
  let sedeExistente = 0
  const sedesIds = sedesAsignadas.map(function (sede) {
    return String(sede._id)
  })
  
  sedeExistente = sedesIds.indexOf(String(req.query.sede))
  
  if (sedeExistente < 0) {
    res.status(403).send({
      message: 'El id de la sede que envió no le pertenece.',
      body: req.body
    })
  } else {
    var archivoCrear = Object({})
    archivoCrear.Sede = req.query.sede
    archivoCrear.creador = req.user._id
    archivoCrear.data = req.file
    ArchivoModel.findOne({ 'data.key': req.file.key }, function (err, ArchivoEncontrado) {
      if (err) {
        res.status(500).send({
          message: 'Error al crear el dato del Archivo.',
          error: err
        })
      } else if (ArchivoEncontrado == null) {
        ArchivoModel.create(archivoCrear, function (err, archivoCreado) {
          if (err) {
            res.status(500).send({
              message: 'Error al crear el dato del Archivo.',
              error: err
            })
          } else {
            res.status(201).send(archivoCreado)
          }
        })
      } else {
        ArchivoEncontrado.save(function (err, ArchivoActualizado) {
          if (err) {
            res.status(500).send({
              message: 'Error al crear el dato del Archivo.',
              error: err
            })
          } else {
            res.status(200).send(ArchivoActualizado)
          }
        })
      }
    })
  }
}
