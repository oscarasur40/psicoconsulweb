const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ConsentimientoSchema = new Schema({
    
  /** Profesional que atendí la cita y generalo la Historia Clínica. */
  Profesional: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  textoConsentimientoChildren: {
    type: Schema.Types.String,
    default: '',
    required: true
  },
  textoConsentimientoadulto: {
    type: Schema.Types.String,
    default: '',
    required: true
  },
  fecha: {
    type: Schema.Types.String,
    default: '',
    required: true
  }
}, 
  {
    strict: true
})

const ConsentimientoModel = mongoose.model('Consentimiento', ConsentimientoSchema)

module.exports = ConsentimientoModel