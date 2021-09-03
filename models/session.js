const mongoose = require('mongoose')
const Schema = mongoose.Schema

const SessionesSchema = new Schema({
    sessionCoterapetura:{        
        type: String,
        required: false,
        default: ''
    },
    sessionSupervisor: {
        type: String,
        required: false,
        default: ''
    },
    nombreDocente: {
        type: String,
        required: false,
        default: ''
    },
    fechaSession: { 
        type: String,
        required: false,
        default: ''
    },
    causa: {
        type: String,
        required: false,
        default: ''
    },
    valoracionEfectos: {
        type: String,
        required: false,
        default: ''
    },
    dinamicaSession: {
        type: String,
        required: false,
        default: ''
    },
    objectivos: {
        type: String,
        required: false,
        default: ''
    },
    hipotesis: {
        type: String,
        required: false,
        default: ''
    },
    estrategia: {
        type: String,
        required: false,
        default: ''
    },
    cierreSession: {
        type: String,
        required: false,
        default: ''
    },
    personasConvocadas: {
        type: String,
        required: false,
        default: ''
    },
    finalidadConsulta: {
        type: String,
        required: false,
        default: ''
    },
    causaExterna: {
        type: String,
        required: false,
        default: ''
    }
}, {
    strict: true
})


const SesionesModel = mongoose.model('Sessiones', SessionesSchema)

module.exports = SesionesModel
