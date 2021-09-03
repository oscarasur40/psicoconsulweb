const mongoose = require('mongoose')
const Schema = mongoose.Schema
const UserModel = require('./UserModel')
const ResumenHcModelSchema = new Schema({
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
    fechaIncio: {
        type: String,
        required: false,
        default: ''
    },
    fechaFin: {
        type: String,
        required: false,
        default: ''
    },
    casoRemitido: {
        type: String,
        required: false,
        default: ''
    },
    profesionalRemite: {
        type: String,
        required: false,
        default: ''
    },
    motivoConsulta: {
        type: String,
        required: false,
        default: ''
    },
    objetivoIntervecion: {
        type: String,
        required: false,
        default: ''
    },
    nivelesAbordaje: {
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
    Pareja: {
        type: String,
        required: false,
        default: ''
    },
    FamiliaNuclear: {
        type: String,
        required: false,
        default: ''
    },
    FamiliaExtensa: {
        type: String,
        required: false,
        default: ''
    },
    Redes: {
        type: String,
        required: false,
        default: ''
    },
    logrosAlcanzados: {
        type: String,
        required: false,
        default: ''
    },
    Recomendaciones: {
        type: String,
        required: false,
        default: ''
    },
    insitucionRemite: {
        type: String,
        required: false,
        default: ''
    },
    lecturaPsicologica: {
        type: String,
        required: false,
        default: ''
    },
    numeroDeSesiones: {
        type: String,
        required: false,
        default: ''
    },
    motivoCierreR: {
        type: String,
        required: false,
        default: ''
    },
    fechaCreadoR: {
        type: String,
        required: false,
        default: ''
    },
    aprobadoResumen: {
        type: Boolean,
        required: false,
        default: false
    },
}, {
    strict: true
});
ResumenHcModelSchema.plugin(require('mongoose-autopopulate'))
const ResumenHcModel = mongoose.model('ResumenHcModel', ResumenHcModelSchema)

module.exports = ResumenHcModel