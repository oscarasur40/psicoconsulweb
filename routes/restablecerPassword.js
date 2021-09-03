var express = require('express')
var router = express.Router()

/* GET home page. */
router.get('/restablecerPassword', function (req, res, next) {
    console.log("Holaaaaaaaaaaaaaa")
  res.render('/restablecerPassword', {
    title: 'Te ganastes un peñon',
    user: req.user
  })
})

module.exports = router