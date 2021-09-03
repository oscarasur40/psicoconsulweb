// TODO RUTA: Modificar los datos de un usuario en general
// TODO RUTA: Inhabilitar usuarios. No el superadmin. Los usuario no pueden eliminarse.
// TODO RUTA: Reinicio de contraseña con Correo.

const express = require('express')
const router = express.Router()

const changePassword = require('./passwordChange')
const updateMyProfile = require('../me/updateMyProfile')
const getme = require('./getme')

router.get('/', getme)
router.post('/password', changePassword)
router.patch('/update', updateMyProfile)

module.exports = router
