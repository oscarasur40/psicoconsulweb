/** Valida si el usuario es adminsede o paciente */
module.exports = function (req, res, next) {
  // eslint-disable-next-line eqeqeq
  if (req.user.tipo === 'adminsede' || req.user.tipo === 'paciente') {
    next()
  } else {
    res.status(401).send({
      message: 'No tienes permiso para acceder a este proceso.'
    })
  }
}
