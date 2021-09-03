const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ArchivoSchema = new Schema({
  Sede: {
    type: Schema.Types.ObjectId,
    ref: 'Sede',
    required: [true, 'El Archivo debe ser asignado a una sede.'],
    autopopulate: {
      maxDepth: 1
    }
  },
  creador: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: false,
    autopopulate: {
      maxDepth: 1
    }
  },
  data: {
    type: Schema.Types.Mixed,
    required: [true, 'Se debe proveer los datos de subida del Archivo.']
  }
}, {
  strict: true
})

ArchivoSchema.plugin(require('mongoose-autopopulate'))

const ArchivoModel = mongoose.model('Archivo', ArchivoSchema)

module.exports = ArchivoModel
