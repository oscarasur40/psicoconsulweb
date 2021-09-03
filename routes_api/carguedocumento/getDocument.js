const CargueModel = require('../../models/CargueDocumentoModel')
const ut = require('../../lib/userTools')

module.exports = function (req, res) {
  var profesionalObj = req.params
  console.log("documento ", profesionalObj)
  CargueModel.find({
    sede: profesionalObj.idSede,
    Paciente: profesionalObj.idUser
  }, function (err, userCreado) {
    if (err) {
      // eslint-disable-next-line no-prototype-builtins      
      console.log('err', err)
      res.status(500).send({
        message: 'Hubo un error en Buscar el documento.',
        error: err
      })
    } else {
      res.status(201).send(userCreado)
    }
  })
}