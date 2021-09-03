const TiempoCita = require('../../models/TiempoCita')


module.exports = function (req, res){
    TiempoCita.find({Sede: req.params.Sede }, function (err, tiempoCreado) {
        if (err) {
            console.log('err', err)
            res.status(404).send({
            message: 'Hubo un error al crear el time.',
            error: err
            })
        }
        res.status(201).send(tiempoCreado)
    })
}