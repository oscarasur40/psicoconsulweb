const mongoose = require('mongoose')
const Schema = mongoose.Schema
const UserModel = require('./UserModel')

const SedeSchema = new Schema({
  nombre: {
    type: String,
    required: [true, 'Se debe proveer un nombre a la sede.'],
    unique: false
  },
  direccion: {
    type: String,
    required: [true, 'Se debe proveer una dirección a la sede.'],
    unique: false
  },

  correo: {
    type: String,
    required: [true, 'Se debe proveer una dirección de correo electronico a la sede.'],
    unique: false
  },

  codigo_servicios: {
    type: String,
    required: false
  },
  /**
   * Para el teléfono usar el formato de whatsapp sin el simbolo "+" o "-"
   */
  telefono: {
    type: String,
    required: [true, 'Se debe proveer un número telefónico a la sede.'],
    unique: false
  },

  telefono2: {
    type: String,
    required: [true, 'Se debe proveer un número telefónico a la sede.'],
    unique: false
  },
  /**
   * Todas las sedes deben tener un propietario y debe ser un administrador de sedes.
   */
  propietario: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    autopopulate: {
      maxDepth: 1
    },
    required: [true, 'Se debe asignar un administrador de sedes. Usa su Id.'],
    /*validate: {
      isAsync: true,
      validator: function (v, cb) {
        UserModel.findById(v, 'tipo Sedes limite_sedes_crear', function (err, usuario) {
          if (err) {
            cb(err, false)
          } else {
            if (usuario.tipo === 'adminsede') {
              if (!(usuario.Sedes.length >= usuario.limite_sedes_crear)) {
                // eslint-disable-next-line standard/no-callback-literal
                cb(true)
              } else {
                cb(null, false);

              }
            } else {
              cb(null, false)
            }
          }
        })
      },
      message: 'Usuario no es válido, no es un administrador de sedes o llegó a su limite de sedes.'
    }*/
  },

  tipo_id: {
    type: String,
    required: [true, 'Se debe proveer un tipo de identificación.'],
    unique: false
  },

  numID: {
    type: Number,
    required: [true, 'Se debe proveer un Número de identificación.'],
    unique: true
  },

  paisobl: {
    type: String,
    required: [false, 'Se debe proveer un país.'],
    unique: false
  },

  departamentoobl: {
    type: String,
    required: [false, 'Se debe proveer un país.'],
    unique: false
  },
  departamentoreg: {
    type: String,
    required: [false, 'Se debe proveer un país.'],
    unique: false
  },  
  codigo: {
    type: String,
    default: function () {
      return Math.floor(new Date().valueOf() / 100).toString(16)
    },
    unique: [true, 'El código de de sede debe ser único.']
  },
  representante_nombre: {
    type: String,
    required: false
  },
  representante_identificacion: {
    type: String,
    required: false
  },
  representante_identificacion_tipo: {
    type: String,
    required: false,
    enum: ['NI', 'CC', 'CE', 'CD', 'PA', 'PE']
  },
  
  paisreg:{
    type: String,
    required: [false,"se debe proveer un pais"],
    unique:false
  },

  ciudadobl:{
    type: String,
    required: [false,"se debe proveer una ciudad"],
    unique:false
  },
  ciudadreg:{
    type: String,
    required: [false,"se debe proveer una ciudad"],
    unique:false
  },
  direccionreg:{
    type: String,
    required: [true,"se debe proveer una dirección"],
    unique:false
  },

  phone3:{
    type: Number,
    required: [true,"se debe proveer un teléfono"],
    unique:false
  },

  phone4:{
    type: Number,
    required: [true,"se debe proveer una teléfono"],
    unique:false
  },

  emailreg:{
    type: String,
    required: [true,"se debe proveer un correo electronico"],
    unique:false
  },

  logo: {
    type: Schema.Types.Mixed,
    required: false,
    default: null
  }
}, {
  strict: true
})

SedeSchema.post('save', function (doc) {
  UserModel.findByIdAndUpdate(doc.propietario, {
    $addToSet: {
      Sedes: doc._id
    }
  }, {
    new: true
  }, function (err, usuarioActualizado) {
    if (err) {
      console.log('Error al agregar Sede al Usuario.', err)
    } else {
      console.log(`'Sede ${doc.nombre}:${doc._id} Agregada con éxito al usuario: ${usuarioActualizado.username}:${usuarioActualizado._id}`)
    }
  })
})

SedeSchema.plugin(require('mongoose-autopopulate'))

const SedeModel = mongoose.model('Sede', SedeSchema)

module.exports = SedeModel
