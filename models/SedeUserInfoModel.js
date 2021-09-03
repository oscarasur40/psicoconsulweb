const mongoose = require('mongoose')
const Schema = mongoose.Schema

const SedeUserInfoSchema = new Schema({
  sede: {
    type: Schema.Types.ObjectId,
    ref: 'sede',
    autopopulate: true,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    autopopulate: true,
    required: true
  },
  // Datos generales de los usuarios en una sede
  nombre: {
    type: String,
    required: true,
    default: 'Anónimo'
  },
  apellido: {
    type: String,
    required: true,
    default: 'Anónimo'
  },
  yyyy_nacimiento: {
    type: Number,
    required: false,
    default: 0
  },
  mm_nacimiento: {
    type: Number,
    required: false,
    default: 0
  },
  dd_nacimiento: {
    type: Number,
    required: false,
    default: 0
  },
  ts_nacimiento: {
    // timestamp
    type: Number,
    required: false,
    default: 0
  }
}, {
  strict: true
})

const SedeUserInfoModel = mongoose.model('SedeUserInfo', SedeUserInfoSchema)

module.exports = SedeUserInfoModel
