const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CommentSchema = new Schema({
    sede: {
       type: Schema.Types.ObjectId,
       ref: 'sede',
       autopopulate: true,
       required: true
    },
    Paciente: {
       type: Schema.Types.ObjectId,
       ref: 'user',
       autopopulate: true,
       required: true
    },
    Cita: {
      type: Schema.Types.ObjectId,
      ref: 'Cita',
      autopopulate: {
        maxDepth: 2
      },
      required: [true, 'Debe ingresar la cita']
    }, 
    Profesional: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    headComment: {
        type: String,
        required: false,
        default: ''
    },
    fechaSystem: {
        type: String,
        required: false,
        default: ''
    },
    comentarioProfe: {
      type: String,
      required: false,
      default: ''
  },
    comentario: {
        type: String,
        required: false,
        default: ''
    },
    name: {
      type: String,
      required: false,
      default: ''
  },
    cierraComment: {
        type: Boolean,
        required: false,
        default: false
    }
}, {
    strict: true
});

const CommentModel = mongoose.model('Commet', CommentSchema)

module.exports = CommentModel