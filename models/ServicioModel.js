const mongoose = require('mongoose')
const UserModel = require('./UserModel')
const Schema = mongoose.Schema

const ServicioSchema = new Schema({
  /** Sede a la que pertenece el Servicio */
  Sede: {
    type: Schema.Types.ObjectId,
    ref: 'Sede',
    required: [true, 'El Servicio debe ser asignado a una sede.'],
    autopopulate: {
      maxDepth: 1
    }
  },
  /** Usuario quien creó del servicio */
  creador: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: false,
    autopopulate: {
      maxDepth: 1
    }
  },
  /** Nombre del Servicio */
  nombre: {
    type: String,
    validate: {
      validator: function (v) {
        return v.split(' ').join('').length > 0
      },
      message: 'El nombre del servicio no puede estar vacio'
    },
    required: [true, 'El nombre del servicio es requerido.']
  },
  /** Código CUPS del Servicio */
  cups_codigo: {
    type: String,
    required: [true, 'Hay que proveer un código cups al Servicio.']
  },
  /** Nombre del Código CUPS del Servicio */
  cups_nombre: {
    type: String,
    required: false
  },
  /** Formulario que utilizará el servicio. */
  Formulario: {
    type: Schema.Types.ObjectId,
    ref: 'Formulario',
    required: [true, 'Se debe asignar un Formulario al servicio.'],
    autopopulate: {
      maxDepth: 1
    }
  },
  /** Profesionales que pueden Acceder a este servicio. */
  Profesionales: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: false,
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
  }],
  /** Valor de la consulta */
  valor_consulta: {
    type: Number,
    required: [true, 'Se debe asignar un valor de consulta al Servicio.']
  },
  modalidad_consulta: {
    type: Number,
    required: [true, 'Se debe asignar un valor de la modalidad de la consulta.']
  },
  grupo_servicios: {
    type: Number,
    required: [true, 'Se debe asignar un valor a el grupo de srvicios.']
  }


}, {
  strict: true
})

ServicioSchema.plugin(require('mongoose-autopopulate'))

const ServicioModel = mongoose.model('Servicio', ServicioSchema)

module.exports = ServicioModel
