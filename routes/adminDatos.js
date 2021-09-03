var express = require('express')
var router = express.Router()
const Consultorios = require('../models/Consultorios')
/* GET home page. */
router.get('/', function (req, res, next) {
    var queryIn = {
        Sede: req.params.Sede
    }
    Consultorios.find(queryIn, function (err, ConsultorioEncontrado) {
        if (err) {
            res.render('404', {
                title: '403 Forbidden',
                user: req.user
              }) 
        }else{
            res.render('adminDatos/index', {
                title: 'Datos',
                user: req.user,
                sede_id: req.query.sede,
                consultorios: ConsultorioEncontrado
            })
        }

    })

})

module.exports = router