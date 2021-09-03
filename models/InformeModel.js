const mongoose = require('mongoose')
const UserModel = require('./UserModel')
const Schema = mongoose.Schema

const InformeModelSchema = new Schema({
        sede: {
          type: Schema.Types.ObjectId,
          ref: 'Sede',
          autopopulate: true,
          required: true
      },
      paciente: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        autopopulate: true,
        required: true
     },
    fechaSystem: {
        type: String,
        required: false,
        default: ''
    },
    idInformeremision: {
        type: String,
        required: false,
        default: ''
    },
    direccionRemision: {
        type: String,
        required: false,
        default: ''
    },
    idIntervencion: {
        type: String,
        required: false,
        default: ''
    },
    idResultadosRealizados: {
        type: String,
        required: false,
        default: ''
    },
    idRecomendacionesProfesionales: {
        type: String,
        required: false,
        default: ''
    },
    motivoRemision: {
        type: String,
        required: false,
        default: ''
    },
    psicologoRemite: {
        type: String,
        required: false,
        default: ''
    },
    entidadRemite: {
        type: String,
        required: false,
        default: ''
    },
    psoclogyFormated: {
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
    aprobadoInfo: {
        type: Boolean,
        required: false,
        default: false
    },
}, {
    strict: true
});
InformeModelSchema.plugin(require('mongoose-autopopulate'))
const InformeModel = mongoose.model('InformeModel', InformeModelSchema)

module.exports = InformeModel