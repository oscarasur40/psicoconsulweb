module.exports = function (req, res, next) {
  // eslint-disable-next-line eqeqeq
  
  if (req.path == '/login') {
    next()
  // eslint-disable-next-line eqeqeq
  } else if (req.user == undefined) {
    res.redirect('/login')
  } else {
    next()
  }
}
// && req.path != '/login' && req.path.split('/')[1].toLowerCase() != 'api'
