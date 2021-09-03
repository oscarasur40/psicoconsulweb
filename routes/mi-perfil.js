var express = require('express')
var router = express.Router()

/* GET home page. */
router.get('/', function (req, res, next) {
  var localsToSend = {
    title: 'Mi Perfil',
    user: req.user,
    departamentos: require('../lib/DepartamentosColombia'),
    municipios: require('../lib/MunicipiosColombia'),
    eps: require('../lib/EPS'),
    paises: require('../lib/Paises'),
  }
  switch (req.user.tipo) {
    case 'superadmin':
      res.status(200).send('superadmin')
      // res.render('mi-perfil/superadmin', localsToSend)
      break
    case 'adminsede':
      // res.status(200).send('adminsede')
      res.render('mi-perfil/adminsede', localsToSend)
      break
    case 'profesional':
      // res.status(200).send('profesional')
      res.render('mi-perfil/profesional', localsToSend)
      break
    case 'paciente':
      res.render('mi-perfil/paciente', localsToSend)
      // res.render('mi-perfil/paciente', localsToSend)
      break
    default:
      res.redirect('/logout')
      break
  }
})

module.exports = router
