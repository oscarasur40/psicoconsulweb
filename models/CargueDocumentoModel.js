/* eslint-disable no-dupe-keys */
const mongoose = require('mongoose')
const moment = require('moment')
const Schema = mongoose.Schema

const CargueDocumentoSchema = new Schema({
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
    tipoDocumento: {
        type: String,
        required: [true, 'Seleccione un Tipo Documento'],
        default: ''
      },
    descripcionDocumento: {
        type: String,
        required: [true, 'Descripcion del documento'],
        default: ''
      },
    urlDocumento: {
        type: String,
        required: [true, 'Url no esta'],
        default: ''
    },
    creado_timestamp: {
        type: Number,
        required: [true, 'Se debe incluir el timestamp de la creación de la Factura.'],
        default: Date.now
    }
}, {
    strict: true
});

const CargueDocumentoModel = mongoose.model('CargueDocumento', CargueDocumentoSchema)

module.exports = CargueDocumentoModel