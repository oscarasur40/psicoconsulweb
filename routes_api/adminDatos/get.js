const Consultorios = require('../../models/Consultorios')


module.exports = function (req, res){
    var ConsentimientoObj = req.params.Sede
    console.log(ConsentimientoObj)
    var queryIn = {}

    queryIn = {
        Sede: [ ConsentimientoObj ]
    }

    Consultorios.find(queryIn, function (err, ConsultorioEncontrado) {
        if (err) {
            
            res.status(404).send({
            message: 'Hubo un error al crear al Consentimiento.',
            error: err
            })
        }else{
        
            res.status(201).send(ConsultorioEncontrado)
        }

    })
}