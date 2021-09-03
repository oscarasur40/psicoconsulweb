const mongoose = require('mongoose')
const Schema = mongoose.Schema

const FacturaSchema = new Schema({
  /** Sede a la que pertenece la Factura */
  Sede: {
    type: Schema.Types.ObjectId,
    ref: 'Sede',
    required: [true, 'La Factura debe ser asignada a una sede.'],
    autopopulate: {
      maxDepth: 1
    }
  },
  /**
   *  Nombre del Contribuyente
   */
  contribuyente_nombre: {
    type: String,
    required: [true, 'Se debe proveer el nombre del contribuyente la factura.'],
  },
  /**
   *  NIT del Contribuyente
   */
  contribuyente_nit: {
    type: String,
    required: [true, 'Se debe proveer el nit del contribuyente la factura.'],
  },
  /**
   *  Dirección del Contribuyente
   */
  contribuyente_direccion: {
    type: String,
    required: [true, 'Se debe proveer la dirección del contribuyente la factura.'],
    default: 'Ciudad'
  },
  /** Código CUPS del Servicio facturado */
  cups_codigo: {
    type: String,
    required: [true, 'Hay que proveer un código cups relacionado al Servicio que se esta facturando.']
  },
  /** Nombre del Código CUPS del Servicio facturado */
  cups_nombre: {
    type: String,
    required: false
  },
  Cita: {
    type: Schema.Types.ObjectId,
    ref: 'Cita',
    autopopulate: {
      maxDepth: 2
    },
    required: [true, 'Se debe proveer el Id de la Cita que se está facturando.']
  },
  /**
   * Valida si la factura ya ha sido completamente pagada.
   * Debe ser false si ha sido pagado parcialmente.
   */
  pagado: {
    type: Boolean,
    required: true,
    default: false
  },
  pagado_timestamp: {
    type: Number,
    required: false,
    default: function () {
      return this.creado_timestamp
    }
  },
  /**
   * Define el valor total a pagar de la factura.
   */
  valor_factura: {
    type: Number,
    required: [true, 'Se debe incluir el valor a pagar de la factura.']
  },
  /**
   * Define cuanto se ha pagado de la consulta.
   * Si el valor es identico a valor_fcatura, se debe asigar true a pagado.
   */
  valor_pagado: {
    type: Number,
    required: true,
    default: 0
  },
  /**
   * Este dato debe usarse para cuano se necesite dejar un comentario a la Factura.
   */
  observaciones: {
    type: String,
    required: false,
    default: ''
  },
  /**
   * Guarda el Id del usuarioq ue Autorizó el pago de la factura.
   */
  Autorizador: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: false,
    autopopulate: {
      maxDepth: 1
    }
  },
  Paciente: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    autopopulate: {
      maxDepth: 1
    }
  }],
  /**
  * Guarda el Id del usuario que creó la la factura.
  */
  creador: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Se debe incluir el Id del creador de la factura.'],
    autopopulate: {
      maxDepth: 1
    }
  },
  creado_timestamp: {
    type: Number,
    required: [true, 'Se debe incluir el timestamp de la creación de la Factura.']
  }
}, {
  strict: true
})

const FacturaModel = mongoose.model('Factura', FacturaSchema)

module.exports = FacturaModel
