const CasoFallidoModel = require('../../models/CasoFallidoModel')

module.exports = function (req, res) {
  console.log(">>>>>", req.body)
    CasoFallidoModel.create(req.body, function (err, casoCreado) {
    if (err) {
      res.status(500).send({
        message: 'Error al crear el caso.',
        error: err
      })
    } else {
      res.status(201).send(casoCreado)
    }
  })
}