var express = require('express')
var router = express.Router()

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('parametros/general', {
    title: 'Parámetros',
    user: req.user
  })
})

router.get('/sede', function (req, res, next) {
  res.render('parametros/sede', {
    title: 'Parámetros',
    user: req.user
  })
})

module.exports = router
