const mongoose = require('mongoose')
const UserModel = require('./UserModel')
const Schema = mongoose.Schema

const DisponibilidadSchema = new Schema({

  /** Sede a la que pertenece la Cita. */
  Sede: {
    type: Schema.Types.ObjectId,
    ref: 'Sede',
    required: [true, 'La Cita debe ser asignada a una sede.'],
    autopopulate: {
      maxDepth: 1
    }
  },
  /** Profesional que atenderá la Cita. */
  Profesional: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    validate: {
      isAsync: true,
      validator: function (v, cb) {
        UserModel.findById(v, 'tipo', function (err, usuario) {
          if (err) {
            cb(err, false)
          } else {
            if (['adminsede', 'profesional'].includes(usuario.tipo)) {
              // eslint-disable-next-line standard/no-callback-literal
              cb(true)
            }
          }
        })
      },
      message: 'Usuario no es válido, no es un administrador de sedes o un profesional.'
    },
    autopopulate: {
      maxDepth: 1
    }
  },
  calendario: {
    type: Schema.Types.Mixed,
    required: [true, 'El calendario es obligatorio']
  },
  activo: {
    type: Boolean,
    required: false,
    default: true
  }
}, {
  strict: true
})

DisponibilidadSchema.plugin(require('mongoose-autopopulate'))

const Disponibilidad = mongoose.model('Disponibilidad', DisponibilidadSchema)

module.exports = Disponibilidad
