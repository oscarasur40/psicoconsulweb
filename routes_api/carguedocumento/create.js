const CargueModel = require('../../models/CargueDocumentoModel')
const ut = require('../../lib/userTools')

module.exports = function (req, res) {
  var profesionalObj = req.body
  
  CargueModel.create(profesionalObj, function (err, userCreado) {
    if (err) {
      
      // eslint-disable-next-line no-prototype-builtins
      if (err.code === 11000 && err.keyPattern.hasOwnProperty('username')) {
        res.status(409).send({
          message: `El usuario '${err.keyValue.username}' ya existe en el sitio.`,
          error: err
        })
      } else {
        
        res.status(500).send({
          message: 'Hubo un error al crear al Profesional.',
          error: err
        })
      }
    } else {
      res.status(201).send(userCreado)
    }
  })
} 