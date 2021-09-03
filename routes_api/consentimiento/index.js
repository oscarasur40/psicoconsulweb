// TODO RUTA: Crear admin de sedevar express = require('express');
const express = require('express')
const router = express.Router()
const getConsentimientoById = require('./getConsentimientoById')
const create = require('./create')
const isLoggedAPI_AS_PR_PA = require('../../mw/isLoggedAPI_AS_PR_PA')

/* GET home page. */
router.get('/:id', isLoggedAPI_AS_PR_PA, getConsentimientoById)
router.patch('/:id', isLoggedAPI_AS_PR_PA, create)
// router.patch('/:id', create)
// router.post('/', create)
// router.post('/', create)

module.exports = router
