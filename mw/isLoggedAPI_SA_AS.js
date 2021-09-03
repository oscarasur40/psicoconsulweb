const { log } = require("debug")

/** Valida si el usuario es superadmin o es adminsede */
module.exports = function (req, res, next) {
  // eslint-disable-next-line eqeqeq
  if (['superadmin', 'adminsede'].includes(req.user.tipo)) {
    next()
  } else {
    res.status(401).send({
      message: 'No tienes permiso para acceder a este proceso.'
    })
  }
}
