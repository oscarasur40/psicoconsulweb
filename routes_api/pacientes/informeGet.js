const InformeModel = require('../../models/InformeModel')

module.exports = function (req, res){
    var InformeGet = req.params
    var queryIn = {}
     console.log(InformeGet)
    queryIn = {
        paciente:  InformeGet.idUser ,
        sede: InformeGet.idSede
        
    }
  
    console.log(">>> informes: ", queryIn)
    InformeModel.find(queryIn, function (err, InformeGet) {
        if (err) {
            console.log('err', err)
            res.status(404).send({
            message: 'Hubo un error al crear al Consentimiento.',
            error: err
            })
        }
       console.log(">>>>>", InformeGet)
        res.status(201).send(InformeGet)
    })
  }