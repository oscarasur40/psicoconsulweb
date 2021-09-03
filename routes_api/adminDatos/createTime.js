const TiempoCita = require('../../models/TiempoCita')


module.exports = function (req, res){
    var ConsentimientoObj = req.body
    var data = {
        time: ConsentimientoObj.time,
        Sede: ConsentimientoObj.Sede,
        fechaSytem: ConsentimientoObj.fechaSytem
    }
    TiempoCita.update({Sede: req.params.Sede },
        { $set: data }, 
        { upsert: true }, function (err, tiempoCreado) {
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