var express = require('express')
var router = express.Router()
const isLogged = require('../mw/isLogged')
const cron = require('node-cron')

// router.use(isLogged);

/* GET home page. */
router.get('/', isLogged, function (req, res, next) {
   cron.schedule(' 15 10 * * *',() =>{
    console.log("10:15 A.m")
  })

  res.render('home', {
    title: 'Psicoconsul Web',
    user: req.user,
    sede: req.user.Sedes,
    moment: require('moment'),
  })
})

module.exports = router
