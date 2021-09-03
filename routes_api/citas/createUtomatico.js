const CitaModel = require('../../models/CitaModel')
const UserModel = require('../../models/UserModel')
const moment = require('moment')

module.exports = function (req, res) {
  

    var citaNueva = req.body
    console.log(citaNueva)
      citaNueva.creador = req.user._id

      
      CitaModel.create(citaNueva, function (err, citaCreada) {
        if (err) {
          res.status(500).send({
            message: 'Error al crear la Sede.',
           error: err
          })
        } else {
          res.status(201).send(citaCreada)
          
            
         }
        
       }) 

  
  
}