const mongoose = require('mongoose')
const Schema = mongoose.Schema

const EncargadoSchema = new Schema({
  parentesco: {
    type: String,
    required: [true, 'Se debe proveer la Encargado.'],
    unique: true,
    default: 'Encargado'
  },
  encargado: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    autopopulate: true,
    required: [true, 'Se debe asignar un encargado.']
  },
  dependiente: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    autopopulate: true,
    required: [true, 'Se debe asignar un dependiente.']
  }
}, {
  strict: true
})

const EncargadoModel = mongoose.model('Encargado', EncargadoSchema)

module.exports = EncargadoModel
