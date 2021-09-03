const mongoose = require('mongoose')
const Schema = mongoose.Schema

const DiasModelSchema = new Schema({
    Sede: {
       type: Schema.Types.ObjectId,
       ref: 'sede',
       autopopulate: true,
       required: true
    },
    dia_no_laboral: {
        type: String,
        required: false,
        default: ''
    },
    fechaSytem: {
        type: Number,
        required: false,
        default: ''
    },
}, {
    strict: true
});

const DiasModel = mongoose.model('DiasModel', DiasModelSchema)

module.exports = DiasModel