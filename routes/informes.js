var express = require('express')
var router = express.Router()

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('informes/index', {
        title: 'Informes',
        user: req.user,
        sede_id: req.query.sede
    })
})

module.exports = router