const consentimientoModel = require('../../models/textConsentimienoModel')


module.exports = function (req, res){
    var ConsentimientoObj = req.params
    var queryIn = {}

    queryIn = {
        Profesional: [ ConsentimientoObj.id ]
    }

    
    consentimientoModel.find(queryIn, function (err, consentimientoCreado) {
        if (err) {
            
            res.status(404).send({
            message: 'Hubo un error al crear al Consentimiento.',
            error: err
            })
        }
        
        res.status(201).send(consentimientoCreado)
    })
}