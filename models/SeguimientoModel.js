const mongoose = require('mongoose')
const Schema = mongoose.Schema

const SeguimientoModelSchema = new Schema({
    sede: {
       type: Schema.Types.ObjectId,
       ref: 'sede',
       autopopulate: true,
       required: true
    },
    paciente: {
       type: Schema.Types.ObjectId,
       ref: 'user',
       autopopulate: true,
       required: true
    },
    fechaSystem: {
        type: String,
        required: false,
        default: ''
    },
    typecontrato: {
        type: String,
        required: false,
        default: ''
    },
    continuarProceso: {
        type: String,
        required: false,
        default: ''
    },
    percepcion: {
        type: String,
        required: false,
        default: ''
    },
    cambiosIdentificados: {
        type: String,
        required: false,
        default: ''
    },
    proyectosFuturos: {
        type: String,
        required: false,
        default: ''
    },
    observacionesPsicologo: {
        type: String,
        required: false,
        default: ''
    },
    psoclogyFormated: {
        type: String,
        required: false,
        default: ''
    },
}, {
    strict: true
});

const SeguimientoModel = mongoose.model('SeguimientoModel', SeguimientoModelSchema)

module.exports = SeguimientoModel