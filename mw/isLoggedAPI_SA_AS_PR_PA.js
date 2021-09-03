/** Valida si el usuario es superadmin o adminsede o profesional o paciente */
module.exports = function (req, res, next) {
  // eslint-disable-next-line eqeqeq
  if (req.user.tipo === 'superadmin' || req.user.tipo === 'adminsede' || req.user.tipo === 'profesional' || req.user.tipo === 'paciente') {
    next()
  } else {
    res.status(401).send({
      message: 'No tienes permiso para acceder a este proceso.'
    })
  }
}
