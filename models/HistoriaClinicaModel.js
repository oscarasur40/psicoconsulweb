const mongoose = require('mongoose')
const UserModel = require('./UserModel')
const Schema = mongoose.Schema

const HistoriaClinicaSchema = new Schema({
  /** Sede a la que pertenece la Cita. */
  Sede: {
    type: Schema.Types.ObjectId,
    ref: 'Sede',
    required: [true, 'La Cita debe ser asignada a una sede.'],
    autopopulate: {
      maxDepth: 1
    }
  },
  /** Id de la Cita de la Historia Clínica. */
  Cita: {
    type: Schema.Types.ObjectId,
    ref: 'Cita',
    unique: true,
    required: [true, 'La Cita debe ser asignada a una sede.'],
    autopopulate: {
      maxDepth: 2
    }
  },
  /** Documento del formulario para poder generar de forma visual los datos_formulario.
   * Este datos es obligatorio.
  */
  formulario: {
    type: Schema.Types.Mixed,
    required: true
  },
  /** Datos ingreado en el formulario durante la Cita */
  datos_formulario: {
    type: Schema.Types.Mixed,
    required: true
  },
  /* Datos ingrasado en sesion durante la cita */
  datos_sesion: {
    type: Schema.Types.Mixed,
    required: false
  },
  datos_selectores: {
    type: Schema.Types.Mixed,
    required: false
  },
  /** Id del paciente de la Historia Clínica */
  Paciente: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    autopopulate:{
      maxDepth: 1
    },
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
    }
  }],
  /** Profesional que atendí la cita y generalo la Historia Clínica. */
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
    }
  },
  /** Hora del servidor en la que se cerró la cita, que e que es que es equivalente a la generación
   * de la historia clínica. Si el valor cerrado es false, entonces el valor simboliza la ultima
   * actualización de la historia.
   */
  cita_cerrada_timestamp: {
    type: Number,
    required: [true, 'Se debe asignar una fecha y hora al cerrar la Historia Clínica.']
  },
  /** SI este valor es true no se deb poder modificar la Historia Clínica */
  cerrado: {
    type: Boolean,
    required: false,
    default: false
  }
}, {
  strict: true
})

HistoriaClinicaSchema.plugin(require('mongoose-autopopulate'))

const HisotriaClinicaModel = mongoose.model('HistoriaClinica', HistoriaClinicaSchema)

module.exports = HisotriaClinicaModel
