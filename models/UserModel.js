/* eslint-disable no-dupe-keys */
const mongoose = require('mongoose')
const moment = require('moment')
const Schema = mongoose.Schema
const validateEmail = require('../lib/validateEmail')
const UserSchema = new Schema({
  // Data sensible y general de los usuarios.
  /** El username debe funcionar como documento de identificación paciente. */
  username: {
    type: String,
    required: [true, 'El username es obligatorio. Debe ser el Número de Identificación si es Paciente.'],
    unique: true
  },
  tipo_id: {
    type: String,
    required: [true, 'El Tipo de Identificación es obligatorio.'],
    default: 'DNI',
    enum: ['DNI', 'DPI', 'CC', 'CE', 'CD', 'PA', 'SC', 'PE', 'RC', 'TI', 'CN', 'AS', 'MS']
  },
  salt: {
    type: String,
    required: [true, 'El salt es obligatorio.']
  },
  password: {
    type: String,
    required: [true, 'El password es obligatorio']
  },
  tipo: {
    type: String,
    required: [true, 'El tipo de usuario es obligatorio.'],
    enum: ['superadmin', 'adminsede', 'profesional', 'paciente']
  },
  habilitado: {
    type: Boolean,
    required: [true, 'El habilitado es obligarorio'],
    default: true
  },
  // Datos generales de los usuarios
  nombre: {
    type: String,
    required: [true, 'El nombre es obligatorio'],
    default: 'Anónimo'
  },
  apellido: {
    type: String,
    required: [true, 'El apellido es obligatorio'],
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
    // timestamp de momentJS
    type: Number,
    required: false,
    default: 0
  },
  genero_nacimiento: {
    type: String,
    required: false,
    default: ''
  },
  identidad_sexual: {
    type: String,
    required: false,
    default: ''
  },
  escolaridad: {
    type: String,
    required: false,
    default: '' 
  },
  estado_civil: {
    type: String,
    required: false,
    default: ''
  },
  ocupacion: {
    type: String,
    required: false,
    default: ''
  },
  direccion: {
    type: String,
    required: false,
    default: ''
  },
  estrato: {
    type: String,
    required: false,
    default: ''
  },
  telefono: {
    type: String,
    required: false,
    default: ''
  },
  celular: {
    type: String,
    required: false,
    default: ''
  },
  email: {
    type: String,
    required: false,
    validate: {
      validator: function (v) {
        return validateEmail(v)
      },
      message: 'Revisa el formato del Email.'
    }
  },
  Sedes: [{
    type: Schema.Types.ObjectId,
    ref: 'Sede',
    required: false,
    autopopulate: {
      maxDepth: 1
    }
  }],
  SedeUserInfos: [{
    type: Schema.Types.ObjectId,
    ref: 'SedeUserInfo',
    required: false,
    autopopulate: {
      maxDepth: 1
    }
  }],
  foto_perfil: {
    type: Schema.Types.Mixed,
    required: false,
    default: null
  },
  foto_firma: {
    type: Schema.Types.Mixed,
    required: false,
    default: null
  },
  firma_profesional: {
    type: Schema.Types.Mixed,
    required: false,
    default: null
  },
  /** ZOna horaria par usar dentro del servidor. */
  utc: {
    type: Number,
    required: false,
    default: 0
  },
  // Estos datos deben irse actualizando conforme se vayan necesitando.
  // Datos de Paciente
  Encargados: [{
    type: Schema.Types.ObjectId,
    ref: 'Encargado',
    required: false,
    autopopulate: {
      maxDepth: 1
    }
  }],
  GSS: {
    type: String,
    required: false,
    default: 'No tiene'
  },
  primer_apellido: {
    type: String,
    required: false
  },
  segundo_apellido: {
    type: String,
    required: false
  },
  primer_nombre: {
    type: String,
    required: false
  },
  segundo_nombre: {
    type: String,
    required: false
  },
  pais: {
    type: String,
    required: false
  },
  departamento: {
    type: String,
    required: false
  },
  provincia: {
    type: String,
    required: false
  },
  municipio: {
    type: String,
    required: false
  },
  canton: {
    type: String,
    required: false
  },
  localidad: {
    type: String,
    required: false
  },
  zona: {
    type: String,
    required: false
  },
  regimen_salud: {
    type: String,
    required: false
  },
  rh: {
    type: String,
    required: false
  },
  eps: {
    type: String,
    required: false
  },
  pertenencia_etnica: {
    type: String,
    required: false
  },
  EnEspera: {
    type: Boolean,
    required: false,
    default: false
  },
  // TODO Datos de Profesional
  tipo_profesional: {
    type: String,
    required: false
  },
  profesion: {
    type: String,
    required: false
  },
  especialidad: {
    type: String,
    required: false
  },
  tarjeta_profesional: {
    type: String,
    required: false
  },
  //  Datos de Admin de Sede
  /** Limite de Sedes a crear */
  limite_sedes_crear: {
    type: Number,
    required: false,
    default: 1
    // eslint-disable-next-line comma-dangle
  },
  /** Limite de profesionales por sede */
  limite_profesionales_por_sede: {
    type: Number,
    required: false,
    default: 1
  },
  /** Limite de pacientes por sede */
  limite_pacientes_por_sede: {
    type: Number,
    required: false,
    default: 30
  },
  membresia_tipo: {
    type: String,
    required: false,
    default: 'Mensual'
  },
  membresia_precio: {
    type: Number,
    required: false,
    default: 30
  },
  membresia_precio_mensual: {
    type: Number,
    required: false,
    default: 30
  },
  membresia_finaliza: {
    type: Number,
    required: false,
    default: 0
  },
  membresia_inicia: {
    type: String,
    required: false,
    default: 0
  },
  acompanante_nombre: {
    type: String,
    required: false,
    default: ''
  },
  acompanante_tipo_identificacion: {
    type: String,
    required: [false, 'El Tipo de Identificación es obligatorio.'],
    default: 'DNI',
    enum: ['DNI', 'DPI', 'CC', 'CE', 'CD', 'PA', 'SC', 'PE', 'RC', 'TI', 'CN', 'AS', 'MS']
  },
  acompanante_identificacion: {
    type: String,
    required: false,
    default: ''
  },
  acompanante_parentezco: {
    type: String,
    required: false,
    enum: ['DNI', 'PA', 'HI', 'HI', 'ES', 'AB', 'TI', 'CU', 'TL','OT']
  },
  acompanante_parentezco_otro: {
    type: String,
    required: false,
    default: ''
  },
  acompanante_telefono: {
    type: String,
    required: false,
    default: ''
  },
  acompanante_correo: {
    type: String,
    required: false,
    validate: {
      validator: function (v) {
        return validateEmail(v)
      },
      message: 'Revisa el formato del Email.'
    }
  },
  permisosUsers_FirmaConsentimiento:{
    type: Number,
    required: false,
    default: 1
  },
  permisosUsers_DescargaCertificado:{
    type: Number,
    required: false,
    default: 1
  },
  permisosUsers_CreateCitas:{
    type: Number,
    required: false,
    default: 1
  },
  permisosUsers_DescargaRemisiones:{
    type: Number,
    required: false,
    default: 1
  },
  permisosUsers_DescargaHistorialClinico:{
    type: Number,
    required: false,
    default: 1
  },
  permisosUsers_AnexarDocumento:{
    type: Number,
    required: false,
    default: 1
  },
  permisosUsers_autoreporte:{
    type: Number,
    required: false,
    default: 1
  },
  permisosUsers_editarInfo:{
    type: Number,
    required: false,
    default: 1
  },
  estado: {
    type: String,
    required: false,
    default: ''
  },
  roles: {
    type: String,
    required: false,
    default: ''
  },
  RolPrueba: {
    type: String,
    required: false,
    default: ''
  },
  tipoRoles: {
    type: String,
    required: false,
    default: ''
  },
  extraTipoRoles: {
    type: String,
    required: false,
    default: ''
  },
  usuario:{
    type: String,
    required: false,
    default: ''
  },
  horarioInicial: {
    type: String,
    required: false,
    default: ''
  },
  horarioFinal:{
    type: String,
    required: false,
    default: ''
  },
  documentos: {
    type: Schema.Types.Mixed,
    required: false,
    default: null
  },
  LDiurno: {
    type: Number,
    required: false,
    default: 0
  },
  LInicialTimeDiurno: {
    type: String,
    required: false,
    default: ''
  },
  LFinalTimeDiurno: {
    type: String,
    required: false,
    default: ''
  },
  LTarde: {
    type: Number,
    required: false,
    default: 0
  },
  LInicialTimeTarde: {
    type: String,
    required: false,
    default: ''
  },
  LFinalTimeTarde: {
    type: String,
    required: false,
    default: ''
  },
  MaDiruno: {
    type: Number,
    required: false,
    default: 0
  },
  MaInicialTimeDiurno: {
    type: String,
    required: false,
    default: ''
  },
  MaFinalTimeDiurno: {
    type: String,
    required: false,
    default: ''
  },
  MaTarde: {
    type: Number,
    required: false,
    default: 0
  },
  MaInicialTimeTarde: {
    type: String,
    required: false,
    default: ''
  },
  MaFinalTimeTarde: {
    type: String,
    required: false,
    default: ''
  },
  MiDiruno: {
    type: Number,
    required: false,
    default: 0
  },
  MiInicialTimeDiurno: {
    type: String,
    required: false,
    default: ''
  },
  MiFinalTimeDiurno: {
    type: String,
    required: false,
    default: ''
  },
  MiTarde: {
    type: Number,
    required: false,
    default: 0
  },
  MiInicialTimeTarde: {
    type: String,
    required: false,
    default: ''
  },
  MiFinalTimeTarde: {
    type: String,
    required: false,
    default: ''
  },
  JDiruno: {
    type: Number,
    required: false,
    default: 0
  },
  JInicialTimeDiurno: {
    type: String,
    required: false,
    default: ''
  },
  JFinalTimeDiurno: {
    type: String,
    required: false,
    default: ''
  },
  JTarde: {
    type: Number,
    required: false,
    default: 0
  },
  JInicialTimeTarde: {
    type: String,
    required: false,
    default: ''
  },
  JFinalTimeTarde: {
    type: String,
    required: false,
    default: ''
  },
  VDiruno: {
    type: Number,
    required: false,
    default: 0
  },
  VInicialTimeDiurno: {
    type: String,
    required: false,
    default: ''
  },
  VFinalTimeDiurno: {
    type: String,
    required: false,
    default: ''
  },
  VTarde: {
    type: Number,
    required: false,
    default: 0
  },
  VInicialTimeTarde: {
    type: String,
    required: false,
    default: ''
  },
  VFinalTimeTarde: {
    type: String,
    required: false,
    default: ''
  },
  SDiruno: {
    type: Number,
    required: false,
    default: 0
  },
  SInicialTimeDiurno: {
    type: String,
    required: false,
    default: ''
  },
  SFinalTimeDiurno: {
    type: String,
    required: false,
    default: ''
  },
  STarde: {
    type: Number,
    required: false,
    default: 0
  },
  SInicialTimeTarde: {
    type: String,
    required: false,
    default: ''
  },
  SFinalTimeTarde: {
    type: String,
    required: false,
    default: ''
  },
  DoDiruno: {
    type: Number,
    required: false,
    default: 0
  },
  DoInicialTimeDiurno: {
    type: String,
    required: false,
    default: ''
  },
  DoFinalTimeDiurno: {
    type: String,
    required: false,
    default: ''
  },
  DoTarde: {
    type: Number,
    required: false,
    default: 0
  },
  DoInicialTimeTarde: {
    type: String,
    required: false,
    default: ''
  },
  DoFinalTimeTarde: {
    type: String,
    required: false,
    default: ''
  },
  calendario: {
    type: Schema.Types.Mixed,
    required: false,
  },
  idProfesional: {
    type: String,
    required: false
  },
  supervisorAsign: {
      type: String,
      required: false,
      default: ''
  }
  // TODO Datos de Super Usuario
}, {
  strict: true,
  toObject: {
    virtuals: true
  },
  toJSON: {
    virtuals: true
  }
})

UserSchema.virtual('rango_edad').get(function () {

    var age = moment([`${this.yyyy_nacimiento}-${this.mm_nacimiento}-${this.dd_nacimiento}`])
  let rango = ""
  var a = moment();
  var age = a.diff(age, 'years',false);
  var years = age;

  if (years < 6) { 
    rango = "PRIMERA INFANCIA"
  } else if (years < 12) {
    rango = "INFANCIA"
  } else if (years < 18) {
    rango = "ADOLESCENCIA"
  } else if (years < 27) {
    rango = "JUVENTUD"
  } else if (years < 61) {
    rango = "ADULTEZ"
  } else {
    rango = "ADULTEZ MAYOR"
  }

  return rango
});

UserSchema.plugin(require('mongoose-autopopulate'))

const UserModel = mongoose.model('User', UserSchema)

module.exports = UserModel