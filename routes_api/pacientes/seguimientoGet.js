const SeguimientoModel = require('../../models/SeguimientoModel')

module.exports = function (req, res){
    var seguimientoGet = req.params
    var queryIn = {}
     console.log(seguimientoGet)
    queryIn = {
        paciente:  seguimientoGet.idUser ,
        sede: seguimientoGet.idSede
        
    }
  
    console.log(">>> Seguimiento: ", queryIn)
    SeguimientoModel.find(queryIn, function (err, seguimientoGet) {
        if (err) {
            console.log('err', err)
            res.status(404).send({
            message: 'Hubo un error al crear al Consentimiento.',
            error: err
            })
        }
       
        res.status(201).send(seguimientoGet)
    })
  }