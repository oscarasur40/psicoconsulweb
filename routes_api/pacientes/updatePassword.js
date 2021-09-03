const userTools = require('../../lib/userTools')
const UserModel = require('../../models/UserModel')
const {
    createHash
} = require('../../lib/userTools')

module.exports = function (req, res) {
    const projection = req.query.projection || null
    UserModel.findOne({
        _id: req.params._id,
        tipo: 'paciente'
    }, projection, function (err, paciente) {
        if (err) {
            res.status(500).send({
                message: 'Error al buscar al paciente.',
                error: err
            })
        } else if (paciente === null) {
            res.status(404).send({})
        } else {
            const salt = userTools.createSalt()
            const password = userTools.createHash(req.body.password, salt);
            UserModel.findByIdAndUpdate(paciente._id, {
                $set: {
                    salt,
                    password
                }
            })
            console.log(paciente);
        }
    })
}