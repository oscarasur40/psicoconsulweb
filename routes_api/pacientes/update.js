const UserModel = require('../../models/UserModel')
const ut = require('../../lib/userTools')

module.exports = function (req, res) {
  var pacienteObj = req.body
  console.log(pacienteObj)
  var data = {
        primer_apellido: pacienteObj.primer_apellido,
        segundo_apellido: pacienteObj.segundo_apellido,
        primer_nombre: pacienteObj.primer_nombre,
        segundo_nombre: pacienteObj.segundo_nombre,
        pais: pacienteObj.pais,
        departamento: pacienteObj.departamento,
        municipio: pacienteObj.municipio,
        provincia: pacienteObj.provincia,
        canton: pacienteObj.canton,
        localidad: pacienteObj.localidad,
        zona: pacienteObj.zona,
        rh: pacienteObj.rh,
        regimen_salud: pacienteObj.regimen_salud,
        eps: pacienteObj.eps,
        pertenencia_etnica: pacienteObj.pertenencia_etnica,
        tipo_id: pacienteObj.tipo_id,
        nombre: pacienteObj.nombre,
        apellido: pacienteObj.apellido, 
        yyyy_nacimiento: pacienteObj.yyyy_nacimiento,
        mm_nacimiento: pacienteObj.mm_nacimiento,
        dd_nacimiento: pacienteObj.dd_nacimiento,
        ts_nacimiento: pacienteObj.ts_nacimiento,
        genero_nacimiento: pacienteObj.genero_nacimiento,
        identidad_sexual: pacienteObj.identidad_sexual,
        escolaridad: pacienteObj.escolaridad,
        estado_civil: pacienteObj.estado_civil,
        ocupacion: pacienteObj.ocupacion,
        direccion: pacienteObj.direccion,
        estrato: pacienteObj.estrato,
        telefono: pacienteObj.telefono,
        celular: pacienteObj.celular,
        email: pacienteObj.email,
        acompanante_nombre: pacienteObj.acompanante_nombre,
        acompanante_tipo_identificacion: pacienteObj.acompanante_tipo_identificacion,
        acompanante_identificacion: pacienteObj.acompanante_identificacion,
        acompanante_parentezco: pacienteObj.acompanante_parentezco,
        acompanante_parentezco_otro: pacienteObj.acompanante_parentezco_otro,
        acompanante_telefono: pacienteObj.acompanante_telefono,
        acompanante_correo: pacienteObj.acompanante_correo,
        permisosUsers_FirmaConsentimiento: pacienteObj.permisosUsers_FirmaConsentimiento,
        permisosUsers_CreateCitas: pacienteObj.permisosUsers_CreateCitas,
        permisosUsers_DescargaCertificado: pacienteObj.permisosUsers_DescargaCertificado,
        permisosUsers_DescargaRemisiones: pacienteObj.permisosUsers_DescargaRemisiones,
        permisosUsers_DescargaHistorialClinico: pacienteObj.permisosUsers_DescargaHistorialClinico,
        permisosUsers_AnexarDocumento: pacienteObj.permisosUsers_AnexarDocumento,
        permisosUsers_autoreporte: pacienteObj.permisosUsers_autoreporte,
        permisosUsers_editarInfo: pacienteObj.permisosUsers_editarInfo
  }
  UserModel.update({_id: pacienteObj.user_id}, 
    { $set: data }, 
    { upsert: true }, 
    function (err, userCreado) {
    if (err) {
      console.log(err)
      res.status(500).send({
        message: 'Error al actualizar el Profesional',
        error: err
      })
    } else {
      res.status(201).send(userCreado)
    }
  })
}
