/** Valida si el usuario es superadmin */
module.exports = function (req, res, next) {
  console.log('Estoy validadno si es superadmin')
  // eslint-disable-next-line eqeqeq
  if (req.user.tipo === 'superadmin') {
    next()
  } else {
    res.status(401).send({
      message: 'No tienes permiso para acceder a este proceso..'
    })
  }
}
