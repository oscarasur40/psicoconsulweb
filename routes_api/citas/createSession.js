const session = require('../../models/session');
const moment = require('moment');
const { LexModelBuildingService } = require('aws-sdk');

module.exports = function(req, res) {
    const bodySesion = req.body;

    session.create(bodySesion, function(err, session) {
        if (err) {
            res.status(404).send({
                message: 'Error al crear la Sede.',
                error: err
            })
        } else {
            res.status(201).send(session)
        }
    })
}