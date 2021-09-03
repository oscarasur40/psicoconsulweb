const mongoose = require('mongoose')
const UserModel = require('./UserModel')
const Schema = mongoose.Schema

const CitaSchema = new Schema({
  /** Tiulo que aparecerá en el calendario. */
  title: {
    type: String,
    required: false
  },
  /** Sede a la que pertenece la Cita. */
  Sede: {
    type: Schema.Types.ObjectId,
    ref: 'Sede',
    required: [true, 'La Cita debe ser asignada a una sede.'],
    autopopulate: {
      maxDepth: 1
    }
  },
  /** Usuario quien creó la Cita */
  creador: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: false,
    autopopulate: {
      maxDepth: 1
    }
  },
  /** Servicio que utilizará la Cita. */
  Servicio: {
    type: Schema.Types.ObjectId,
    ref: 'Servicio',
    required: [true, 'Se debe asignar un Formulario al servicio.'],
    autopopulate: {
      maxDepth: 1
    }
  },
  /** Valor Monetario de la Cita */
  valor_cita: {
    type: Number,
    required: true
  },
  /** Paciente que tomará la Cita */
  Paciente: [{
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
  }],
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
  /** Hora del servidor para avisar de una cita. Se recomienda que sea en UTC-0 */
  cita_start_timestamp: {
    type: Number,
    required: [true, 'Se debe asignar una fecha y hora al inicio de la cita.']
  },
  /** Hora del servidor para avisar de una cita. Se recomienda que sea en UTC-0 */
  cita_end_timestamp: {
    type: Number,
    required: [true, 'Se debe asignar una fecha y hora al final la cita.']
  },
  /** Hora del servidor en la que fue creada la cita. */
  creado_timestamp: {
    type: Number,
    required: [true, 'Se debe asignar una fecha y hora de creación a la Cita.']
  },
  /** Aqui se debe guardar el link a un sistema de videollamda o chat */
  link_chat: {
    type: String,
    required: false,
    default: ''
  },
  /** Aqui se debe guardar el link de pago de un la consulta */
  link_pago: {
    type: String,
    required: false,
    default: ''
  },
  start: {
    type: String,
    required: true
  },
  end: {
    type: String,
    required: true
  },
  /** Estado de la cita, se usará para hacer reportes.
   * Programada
   * Atendida
   * Cancelada
   * Reprogramada
   */
  estado: {
    type: String,
    required: false,
    default: 'Programada'
  },
  /** Colores de los estados de las citas. Se usan para mostrar en Calendario.
   * Programada: #0790d2
   * Atendida: #0bb305
   * Cancelada: #d21807
   * Reprogramada: #d28407
  */
  color: {
    type: String,
    required: false,
    default: '#0790d2'
  },
  /**
   * Este dato indica si la cita ya ha sido facturada. Si es true, deberia existir un dato en
   * Factura relacionado con la factura que se generó.
   */
  facturado: {
    type: Boolean,
    required: true,
    default: false
  },
  /**
   * Id de la Factura en el Sistema.
   */
  Factura: {
    type: Schema.Types.ObjectId,
    ref: 'Factura',
    required: false,
    autopopulate: {
      maxDepth: 1
    }
  },
  motiveConsulta: {
    type: String,
    required: false,
    default: ''
  },
  consultorioNumber: {
    type: String,
    required: false,
    default: ''
  },
  consentimientoChildren: {    
    type: Number,
    required: false,
    default: 0
  },
  consentimientoAdulto: {    
    type: Number,
    required: false,
    default: 0
  },
  firma: {
    type: String,
    required: false,
    default: ''
  },  
  closePrimeraVez: {
    type: Boolean,
    required: false,
    default: false
  },
  aprobadoMotivoConsul: {
    type: Boolean,
    required: false,
    default: false
  },
  aprobadoCaracteristica: {
    type: Boolean,
    required: false,
    default: false
  },
  aprobadoCaracteristicaSocio: {
    type: Boolean,
    required: false,
    default: false
  },
  aprobadoCiclo: {
    type: Boolean,
    required: false,
    default: false
  },  
  aprobadoVulnera: {
    type: Boolean,
    required: false,
    default: false
  },
  aprobadoEvaluacion: {
    type: Boolean,
    required: false,
    default: false
  },
  aprobadoProceso: {
    type: Boolean,
    required: false,
    default: false
  },
  aprobadoSesiones: {
    type: Boolean,
    required: false,
    default: false
  },

  nombrePacienteFirma: {
    type: String,
    required: false,
    default: ''
  },
  cedulaPacienteFirma: {
    type: String,
    required: false,
    default: ''
  },
  consentimientoFirmado: {
    type: String,
    required: false,
    default: ''
  }
}, {
  strict: true
})

CitaSchema.plugin(require('mongoose-autopopulate'))

const CitaModel = mongoose.model('Cita', CitaSchema)

module.exports = CitaModel
