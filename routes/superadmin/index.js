var express = require('express')
var router = express.Router()
// const isLogged = require('../../mw/isLogged');

// router.use(isLogged(req, res, next));

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('home', {
    title: 'Dashboard',
    user: req.user
  })
})

module.exports = router
