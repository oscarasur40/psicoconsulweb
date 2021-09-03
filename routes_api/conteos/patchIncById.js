var ConteoModel = require('../../models/ConteoModel')

module.exports = function (req, res) {
    
    ConteoModel.findByIdAndUpdate(req.params.id, {
        $inc: {
           valor_actual: 1
        },
    },{
        new: true
    }, function (err, Conteo) {
        if (err) {
            res.status(500).send({
                message: 'Error al actualizar el Conteo.',
                error: err
            })
        } else {
            res.send(Conteo)
        }
    })
}
