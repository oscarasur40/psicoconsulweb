const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ConteosSchema = new Schema({
    Sede: {
        type: Schema.Types.ObjectId,
        ref: 'Sede',
        required: [true, 'El conteo de registro debe asignarse a una sede.'],
        autopopulate: {
            maxDepth: 1
        }
    },
    tipo: {
        type: String,
        required: [true, 'El tipo debe ser agregado al conteo del registro.']
    },
    valor_actual: {
        type: Number,
        required: [true, 'Es necesario el valor actual para el conteo del registro.'],
        default: 0
    }
}, {
    strict: true
})



ConteosSchema.plugin(require('mongoose-autopopulate'))

const ConteoModel = mongoose.model('Conteos', ConteosSchema)

module.exports = ConteoModel