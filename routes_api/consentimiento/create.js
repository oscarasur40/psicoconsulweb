const consentimientoModel = require('../../models/textConsentimienoModel')


module.exports = function (req, res){
    var ConsentimientoObj = req.body
    var data = {
        textoConsentimientoChildren: ConsentimientoObj.textoConsentimientoChildren,
        textoConsentimientoadulto: ConsentimientoObj.textoConsentimientoadulto,
        fecha: ConsentimientoObj.fecha
    }
    consentimientoModel.update({Profesional: req.params.id },
        { $set: data }, 
        { upsert: true }, function (err, consentimientoCreado) {
        if (err) {
            console.log('err', err)
            res.status(404).send({
            message: 'Hubo un error al crear al Consentimiento.',
            error: err
            })
        }
        res.status(201).send(consentimientoCreado)
    })
}