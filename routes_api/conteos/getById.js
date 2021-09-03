var ConteoModel = require('../../models/ConteoModel')

module.exports = function (req, res) {

    ConteoModel.findById(req.params.id, null, null, function (err, conteo) {

        if (err) {
            res.status(500).send({
                message: 'Error al buscar el conteo de Registros.',
                error: err
            })
        } else if (conteo === null) {
            res.status(404).send({})
        } else {
            var sedesAsignadas = req.user.Sedes
            let sedeExistente = 0
            const sedesIds = sedesAsignadas.map(function (sede) {
                return String(sede._id)
            })
            sedeExistente = sedesIds.indexOf(String(conteo.Sede._id))

            if (sedeExistente < 0) {
                res.status(403).send({
                    message: 'El id de la sede del conteo no le pertenece.',
                })
            } else {
                res.send(conteo)
            }
        }
    })
}