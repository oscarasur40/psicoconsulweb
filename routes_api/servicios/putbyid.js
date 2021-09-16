var ServicioModel = require('../../models/ServicioModel')

module.exports = function (req, res) {
    let update ={
        $set: { mostrar_servicio: req.query.mostrar_servicio}
    }
    
    ServicioModel.findByIdAndUpdate(req.query.id, update , function (err, Servicio) {
        if (err) {
            res.status(500).send({
                message: 'Error al actualizar el servicio.',
                error: err
            })
        } else {
            res.send("Servico actualizado")
        }
    })
}
