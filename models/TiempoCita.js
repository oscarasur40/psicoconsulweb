const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TiempoCitaSchema = new Schema({
    Sede: {
       type: Schema.Types.ObjectId,
       ref: 'sede',
       autopopulate: true,
       required: true
    },
    time: {
        type: String,
        required: false,
        default: ''
    },
    fechaSytem: {
        type: String,
        required: false,
        default: ''
    },
}, {
    strict: true
});

const TiempoCita = mongoose.model('TiempoCita', TiempoCitaSchema)

module.exports = TiempoCita