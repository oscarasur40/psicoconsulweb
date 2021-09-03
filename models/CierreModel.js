const mongoose = require('mongoose')
const UserModel = require('./UserModel')
const Schema = mongoose.Schema

const CierreModelSchema = new Schema({
    sede: {
       type: Schema.Types.ObjectId,
       ref: 'Sede',
       autopopulate: true,
       required: true,
       autopopulate: {
        maxDepth: 1
      }
    },
    paciente: {
       type: Schema.Types.ObjectId,
       ref: 'User',
       autopopulate: true,
       required: true
    },
    idLogosAlcanzados: {
        type: String,
        required: false,
        default: ''
    },
    idDescripcionEmergentes: {
        type: String,
        required: false,
        default: ''
    },
    idObservacionSupervisor: {
        type: String,
        required: false,
        default: ''
    },
    motivoCon: {
        type: String,
        required: false,
        default: ''
    },
    fechaCierre: {
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
    numeroDeSesiones: {
        type: String,
        required: false,
        default: ''
    },
    aprobadoCierre: {
        type: Boolean,
        required: false,
        default: false
    },
}, {
    strict: true
});
CierreModelSchema.plugin(require('mongoose-autopopulate'))
const CierreModel = mongoose.model('CierreModel', CierreModelSchema)

module.exports = CierreModel