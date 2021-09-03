const mongoose = require('mongoose')
const Schema = mongoose.Schema

const RecepcionPacienteSchema = new Schema({
    sede: {
       type: Schema.Types.ObjectId,
       ref: 'sede',
       autopopulate: true,
       required: true
    },
    Paciente: {
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
    psoclogyFormated: {
        type: String,
        required: false,
        default: ''
    },
    caseRemition: {
        type: String,
        required: false,
        default: ''
    },
    typeInstitution: {
        type: String,
        required: false,
        default: ''
    },
    institutionRemision: {
        type: String,
        required: false,
        default: ''
    },
    nameInstitution: {
        type: String,
        required: false,
        default: ''
    },
    nameInstitutionRemite: {
        type: String,
        required: false,
        default: ''
    },
    motiveRemision: {
        type: String,
        required: false,
        default: ''
    },
    motiveConsulta: {
        type: String,
        required: false,
        default: ''
    },
    anotacion1:{
        type: String,
        required: false,
        default: ''
    },
    anotacion2: {
        type: String,
        required: false,
        default: ''
    },
    anotacion3: {
        type: String,
        required: false,
        default: ''
    },
    observacion: {
        type: String,
        required: false,
        default: ''
    },
    terapeutaAsign: {
        type: String,
        required: false,
        default: ''
    }
}, {
    strict: true
});

const RecepcionPacienteModel = mongoose.model('RecepcionPaciente', RecepcionPacienteSchema)

module.exports = RecepcionPacienteModel