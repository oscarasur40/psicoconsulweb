const isLoggedAPI = require('../mw/isLoggedAPI')

module.exports = function (app) {
  app.use('/api/', require('./home'))
  app.use('/api/logout', require('./logout'))
  app.use('/api/restablecerPassword', require("./restablecerPassword"))
  // URLs relativas a usuarios
  app.use('/api/me', isLoggedAPI, require('./me'))
  app.use('/api/superadmin', require('./superadmin'))
  app.use('/api/users', isLoggedAPI, require('./users'))
  app.use('/api/adminsedes', isLoggedAPI, require('./adminsedes'))
  app.use('/api/profesionales', isLoggedAPI, require('./profesionales'))
  app.use('/api/pacientes', isLoggedAPI, require('./pacientes'))
  app.use('/api/encargados', isLoggedAPI, require('./encargados'))
  app.use('/api/carguedocumento', isLoggedAPI, require('./carguedocumento'))
  // URLs relativas sedes y consultorios, y sus métodos.
  app.use('/api/sedes', isLoggedAPI, require('./sedes'))
  app.use('/api/sedeuserinfos', isLoggedAPI, require('./sedeUserInfos'))
  app.use('/api/formularios', isLoggedAPI, require('./formularios'))
  app.use('/api/servicios', isLoggedAPI, require('./servicios'))
  app.use('/api/citas', isLoggedAPI, require('./citas'))
  app.use('/api/historias-clinicas', isLoggedAPI, require('./historias-clinicas'))
  app.use('/api/archivos', isLoggedAPI, require('./archivos'))
  app.use('/api/facturas', isLoggedAPI, require('./facturas'))
  app.use('/api/conteos', isLoggedAPI, require('./conteos'))
  app.use('/api/firmaDocument', isLoggedAPI, require('./firmaDocumento'))
  app.use('/api/consentimiento', isLoggedAPI, require('./consentimiento'))
  app.use('/api/recepcionPaciente', isLoggedAPI, require("./recepcionPaciente"))
  app.use('/api/disponibilidad', isLoggedAPI, require("./disponibilidad"))
  app.use('/api/remision', isLoggedAPI, require("./remision"))
  app.use('/api/casoFallido', isLoggedAPI, require("./casoFallido"))
  app.use('/api/adminDatos', isLoggedAPI, require("./adminDatos"))
  
}
