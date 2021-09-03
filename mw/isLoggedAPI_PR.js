/** Valida si el usuario es profesional */
module.exports = function (req, res, next) {
  // eslint-disable-next-line eqeqeq
  if (req.user.tipo === 'profesional') {
    next()
  } else {
    res.status(401).send({
      message: 'No tienes permiso para acceder a este proceso.'
    })
  }
}
