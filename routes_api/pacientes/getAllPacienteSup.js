const UserModel = require('../../models/UserModel')

module.exports = function (req, res){
    var body = req.params
    var queryIn = {}
     console.log(body)
    queryIn = {
        idProfesional:  body.id ,
        Sedes: body.sede
        
    }
  
    console.log(">>> informes: ", queryIn)
    UserModel.find(queryIn, function (err, pacienteGet) {
        if (err) {
            console.log('err', err)
            res.status(404).send({
            message: 'Hubo un error al crear al Consentimiento.',
            error: err
            })
        }
       
        res.status(201).send(pacienteGet)
    })
  }