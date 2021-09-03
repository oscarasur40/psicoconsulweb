const DiasModel = require('../../models/DiasModel')


module.exports = function (req, res){
    var queryIn = {
        Sede: req.params.Sede
    }

    DiasModel.find(queryIn, function (err, Dias) {
        if (err) {
            
            res.status(404).send({
            message: 'Hubo un error al crear al Consentimiento.',
            error: err
            })
        }else{
        
            res.status(201).send(Dias)
        }

    })
}