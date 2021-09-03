// TODO RUTA: Crear admin de sedevar express = require('express');
const express = require('express')
const router = express.Router()
const getInfoCitaDocument = require('./getInfoCitaDocument')
const firmaDocument = require('./firmaDocument')
const isLoggedAPI_PA = require('../../mw/isLoggedAPI_PA')

/* GET home page. */
router.get('/', isLoggedAPI_PA, getInfoCitaDocument)
router.post('/', isLoggedAPI_PA, firmaDocument)
// router.patch('/:id', create)
// router.post('/', create)
// router.post('/', create)

module.exports = router
