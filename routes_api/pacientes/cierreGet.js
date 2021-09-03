const CierreModel = require('../../models/CierreModel')

module.exports = function (req, res){
    var CierreGet = req.params
    var queryIn = {}
     console.log(CierreGet)
    queryIn = {
        paciente:  CierreGet.idUser ,
        sede: CierreGet.idSede
        
    }
  
    console.log(">>> informes: ", queryIn)
    CierreModel.find(queryIn, function (err, CierreGet) {
        if (err) {
            console.log('err', err)
            res.status(404).send({
            message: 'Hubo un error al crear al Consentimiento.',
            error: err
            })
        }
        
        res.status(201).send(CierreGet)
    })
  }