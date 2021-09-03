const mongoose = require('mongoose')
const Schema = mongoose.Schema

const FormularioSchema = new Schema({
  Sede: {
    type: Schema.Types.ObjectId,
    ref: 'Sede',
    required: [true, 'El Formulario debe ser asignado a una sede.'],
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
  nombre: {
    type: String,
    validate: {
      validator: function (v) {
        return v.split(' ').join('').length > 0
      },
      message: 'El nombre del formulario no puede estar vacio'
    },
    required: [true, 'El nombre del formulario es requerido.']
  },
  preguntas: {
    type: Schema.Types.Mixed,
    required: [true, 'Se debe proveer las preguntas para el formulario.']
  }
}, {
  strict: true
})

FormularioSchema.plugin(require('mongoose-autopopulate'))

const FormularioModel = mongoose.model('Formulario', FormularioSchema)

module.exports = FormularioModel
