const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ConsultoriosModelSchema = new Schema({
    Sede: {
       type: Schema.Types.ObjectId,
       ref: 'sede',
       autopopulate: true,
       required: true
    },
    Consultorio: {
        type: String,
        required: false,
        default: ''
    },
    Activo: {
        type: String,
        required: false,
        default: ''
    },
}, {
    strict: true
});

const Consultorios = mongoose.model('Consultorios', ConsultoriosModelSchema)

module.exports = Consultorios