const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PrimeraVezSchema = new Schema({
    motivoConsulta:  {
        type: String,
        required: false,
        default: ''
    },
    rutaDocumentPrimeraVez: {
        type: String,
        required: false,
        default: ''
    },
    mapa_caracteristica: {
        type: String,
        required: false,
        default: ''
    },
    nombreApellido: {
        type: String,
        required: false,
        default: ''
    },
    rolFamilia: {
        type: String,
        required: false,
        default: ''
    },
    edad: {
        type: String,
        required: false,
        default: ''
    },
    Ocupacion: {
        type: String,
        required: false,
        default: ''
    },
    estadoCivil: {
        type: String,
        required: false,
        default: ''
    },
    lugarNacimiento: {
        type: String,
        required: false,
        default: ''
    },
    tipoInstitucion: {
        type: String,
        required: false,
        default: ''
    },
    nombreInstitucion: {
        type: String,
        required: false,
        default: ''
    },
    TiempoVinculacion: {
        type: String,
        required: false,
        default: ''
    },
    OtrosDatos: {
        type: String,
        required: false,
        default: ''
    },
    comoposicionFamiliar: {
        type: String,
        required: false,
        default: ''
    },
    PacienteIdentificado: {
        type: String,
        required: false,
        default: ''
    },
    comprensionCaracteristicas: {
        type: String,
        required: false,
        default: ''
    },
    cicoVital: {
        type: String,
        required: false,
        default: ''
    },
    otasCategorias: {
        type: String,
        required: false,
        default: ''
    },
    comprensionCicloVital: {
        type: String,
        required: false,
        default: ''
    },
    comprensionGeneratividad: {
        type: String,
        required: false,
        default: ''
    },
    lecturaEcopsistema: {
        type: String,
        required: false,
        default: ''
    },
    objectivoTerapeticos: {
        type: String,
        required: false,
        default: ''
    },
    estrategiaConcertada: {
        type: String,
        required: false,
        default: ''
    },
    estrategicaConcertada: {
        type: String,
        required: false,
        default: ''
    },
    evaluacionProcesoTerapeutica: {
        type: String,
        required: false,
        default: ''
    },
    OtrasPersonas: {
        type: String,
        required: false,
        default: ''
    },
    aportesSupervision: {
        type: String,
        required: false,
        default: ''
    },
    FinalidadConsulta: {
        type: String,
        required: false,
        default: ''
    },
    causaExterna: {
        type: String,
        required: false,
        default: ''
    }
},
{
    strict: true
})


const FormularioPrimeraVezModel = mongoose.model('FormularioPrimeraVez', PrimeraVezSchema)

module.exports = FormularioPrimeraVezModel
