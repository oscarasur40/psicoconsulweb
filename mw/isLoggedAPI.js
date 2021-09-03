module.exports = function (req, res, next) {
  
  // eslint-disable-next-line eqeqeq
  if (req.user != undefined) {
    next()
  } else {
    res.status(401).send({
      message: 'No tienes permiso para acceder a este proceso.'
    })
  }
}
