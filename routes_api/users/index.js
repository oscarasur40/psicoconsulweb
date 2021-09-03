// TODO RUTA: Modificar los datos de un usuario en general
// TODO RUTA: Inhabilitar usuarios. No el superadmin. Los usuario no pueden eliminarse.
// TODO RUTA: Reinicio de contraseña en especifico. Usar correo y/o codigo unico.var express = require('express');
const express = require('express')
const router = express.Router()

const getAll = require('./getAll')
const getById = require('./getById')

router.get('/', getAll)
router.get('/:id', getById)

module.exports = router
