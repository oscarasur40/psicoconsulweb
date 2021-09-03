const PrimeraVez = require('../../models/primeraVez');
const moment = require('moment')

module.exports = function (req, res) {
    const bodyPrimeraVez = req.body

    PrimeraVez.create(bodyPrimeraVez, function(err, primeraVez) {
        if (err) {
            res.status(404).send({
                message: 'Error al crear la Sede.',
                error: err
            })
        } else {
            res.status(201).send(citaCreada)
        }
    });

}