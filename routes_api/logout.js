var express = require('express')
var router = express.Router()

/* GET home page. */
router.get('/', function (req, res, next) {
  req.logout()
  res.send({
    mmessage: 'Sesión cerrada con éxito.'
  })
})

module.exports = router
