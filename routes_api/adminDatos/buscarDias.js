const DiasModel = require('../../models/DiasModel')
module.exports = function (req, res) {
var query = {
    dia_no_laboral: req.params.dia_no_laboral,
    Sede: req.params.Sede
}
console.log(">>",query )
DiasModel.find(query , function (err, dataUsers) {
    if (err) {
      res.status(500).send({
        message: 'Error al buscar todos los consultorios.',
        error: err
      })
      // eslint-disable-next-line eqeqeq
    } else if (dataUsers == '') {
        res.status(201).send(true)         
    } else {
      res.status(201).send(false)
    }
  })
}