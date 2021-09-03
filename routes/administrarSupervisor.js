var express = require('express')
var router = express.Router()
const UserModel = require('../models/UserModel')
/* GET home page. */
router.get('/', function (req, res, next) {
    console.log(req.query.super)
    UserModel.find({
        supervisorAsign: req.query.super,
      }, function (err, practi) {
        if (err) {     
        res.render('404', {
        title: '500 Not Found',
        user: req.user
        })
        } else {
            res.render('adminSuper/index', {
                title: 'Datos',
                user: req.user,
                sede_id: req.query.id,
                practicantes: practi
            })
        }
    })  
})

module.exports = router