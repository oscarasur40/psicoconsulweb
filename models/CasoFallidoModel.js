const mongoose = require('mongoose')
const UserModel = require('./UserModel')
const Schema = mongoose.Schema

const CasoFallidoSchema = new Schema({

  /** Sede a la que pertenece la Cita. */
  Sede: {
    type: Schema.Types.ObjectId,
    ref: 'Sede',
    required: [true, 'El caso debe ser asignada a una sede.'],
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
  Paciente: {
    type: Schema.Types.Mixed,
    ref: 'User',
    required: true,
    validate: {
      isAsync: true,
      validator: function (v, cb) {
        UserModel.findById(v, 'tipo', function (err, usuario) {
          if (err) {
            cb(err, false)
          } else {
            if (['paciente'].includes(usuario.tipo)) {
              // eslint-disable-next-line standard/no-callback-literal
              cb(true)
            }
          }
        })
      },
      message: 'Usuario no es válido, no es un paciente.'
    },
    autopopulate: {
      maxDepth: 1
    }
  },
  argumento: {
    type: String,
    required: false,
    default: ''
  },
  fechaSystem: {
    type: String,
    required: false,
    default: ''
  }
}, {
  strict: true
})

CasoFallidoSchema.plugin(require('mongoose-autopopulate'))

const CasoFallidoModel = mongoose.model('CasoFallidoModel', CasoFallidoSchema)

module.exports = CasoFallidoModel