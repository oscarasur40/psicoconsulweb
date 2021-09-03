const UserModel = require('../../models/UserModel')
const ut = require('../../lib/userTools')

module.exports = function (req, res) {
  var profesionalObj = req.body
  console.log(profesionalObj.calendario)
  var data = {
    primer_apellido: profesionalObj.primer_apellido,
    segundo_apellido: profesionalObj.segundo_apellido,
    primer_nombre: profesionalObj.primer_nombre,
    segundo_nombre: profesionalObj.segundo_nombre,
    tipo_profesional: profesionalObj.tipo_profesional,
    especialidad: profesionalObj.especialidad,
    tarjeta_profesional: profesionalObj.tarjeta_profesional,
    tipo_id: profesionalObj.tipo_id,
    nombre: profesionalObj.nombre,
    apellido: profesionalObj.apellido,
    yyyy_nacimiento: profesionalObj.yyyy_nacimiento,
    mm_nacimiento: profesionalObj.mm_nacimiento,
    dd_nacimiento: profesionalObj.dd_nacimiento,
    ts_nacimiento: profesionalObj.ts_nacimiento,
    genero_nacimiento: profesionalObj.genero_nacimiento,
    identidad_sexual: profesionalObj.identidad_sexual,
    estado_civil: profesionalObj.estado_civil,
    telefono: profesionalObj.telefono,
    email: profesionalObj.email,
    estado: profesionalObj.estado,
    roles: profesionalObj.roles,
    tipoRoles: profesionalObj.tipoRoles,
    extraTipoRoles: profesionalObj.extraTipoRoles,
    usuario: profesionalObj.usuario,
    LDiurno: profesionalObj.LDiurno,
    LInicialTimeDiurno: profesionalObj.LInicialTimeDiurno,
    LFinalTimeDiurno: profesionalObj.LFinalTimeDiurno,
    LTarde: profesionalObj.LTarde,
    LInicialTimeTarde: profesionalObj.LInicialTimeTarde,
    LFinalTimeTarde: profesionalObj.LFinalTimeTarde,
    MaDiruno: profesionalObj.MaDiruno,
    MaInicialTimeDiurno: profesionalObj.MaInicialTimeDiurno,
    MaFinalTimeDiurno: profesionalObj.MaFinalTimeDiurno,
    MaTarde: profesionalObj.MaTarde,
    MaInicialTimeTarde: profesionalObj.MaInicialTimeTarde,
    MaFinalTimeTarde: profesionalObj.MaFinalTimeTarde,
    MiDiruno: profesionalObj.MiDiruno,
    MiInicialTimeDiurno: profesionalObj.MiInicialTimeDiurno,
    MiFinalTimeDiurno: profesionalObj.MiFinalTimeDiurno,
    MiTarde: profesionalObj.MiTarde,
    MiInicialTimeTarde: profesionalObj.MiInicialTimeTarde,
    MiFinalTimeTarde: profesionalObj.MiFinalTimeTarde,
    JDiruno: profesionalObj.JDiruno,
    JInicialTimeDiurno: profesionalObj.JInicialTimeDiurno,
    JFinalTimeDiurno: profesionalObj.JFinalTimeDiurno,
    JTarde: profesionalObj.JTarde,
    JInicialTimeTarde: profesionalObj.JInicialTimeTarde,
    JFinalTimeTarde: profesionalObj.JFinalTimeTarde,
    VDiruno: profesionalObj.VDiruno,
    VInicialTimeDiurno: profesionalObj.VInicialTimeDiurno,
    VFinalTimeDiurno: profesionalObj.VFinalTimeDiurno,
    VTarde: profesionalObj.VTarde,
    VInicialTimeTarde: profesionalObj.VInicialTimeTarde,
    VFinalTimeTarde: profesionalObj.VFinalTimeTarde,
    SDiruno: profesionalObj.SDiruno,
    SInicialTimeDiurno: profesionalObj.SInicialTimeDiurno,
    SFinalTimeDiurno: profesionalObj.SFinalTimeDiurno,
    STarde: profesionalObj.STarde,
    SInicialTimeTarde: profesionalObj.SInicialTimeTarde,
    SFinalTimeTarde: profesionalObj.SFinalTimeTarde,
    DoDiruno: profesionalObj.DoDiruno,
    DoInicialTimeDiurno: profesionalObj.DoInicialTimeDiurno,
    DoFinalTimeDiurno: profesionalObj.DoFinalTimeDiurno,
    DoTarde: profesionalObj.DoTarde,
    DoInicialTimeTarde: profesionalObj.DoInicialTimeTarde,
    DoFinalTimeTarde: profesionalObj.DoFinalTimeTarde,
    calendario: profesionalObj.calendario,
    supervisorAsign: profesionalObj.supervisorAsign
    
  }
  
  UserModel.update({_id: profesionalObj.user_id}, 
    { $set: data }, 
    { upsert: true }, 
    function (err, userCreado) {
    if (err) {
      console.log(err)
      res.status(500).send({
        message: 'Error al actualizar el Profesional.',
        error: err
      })
    } else {
      res.status(201).send(userCreado)
    }
  })
}
