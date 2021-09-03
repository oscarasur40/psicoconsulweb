const CierreModel = require('../../models/CierreModel')
const ut = require('../../lib/userTools')

module.exports = function (req, res) {

  CierreModel.update({ _id:req.params._id}, 
    { $set: req.body }, 
    function (err, cierreUp) {
    if (err) {
      console.log(err)
      res.status(500).send({
        message: 'Error al actualizar el Profesional',
        error: err
      })
    } else {
      res.status(201).send("Funciono")
    }
  })
}