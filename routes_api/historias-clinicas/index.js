// TODO RUTA: Crear admin de sedevar express = require('express');
const express = require('express')
const router = express.Router()
const create = require('./create')
const getAll = require('./getAll')
const patchById = require('./patchById')
const getAllPaciente = require('./getAllPaciente')
const printDocument = require('./printDocument')
// eslint-disable-next-line camelcase
const isLoggedAPI_SA_AS_PR = require('../../mw/isLoggedAPI_SA_AS_PR')

/* GET home page. */
router.get('/', isLoggedAPI_SA_AS_PR, getAll)
router.get('/paciente/:sede/:id', isLoggedAPI_SA_AS_PR, getAllPaciente)
// router.get('/profesional')
router.post('/', isLoggedAPI_SA_AS_PR, create)
router.patch('/:id', isLoggedAPI_SA_AS_PR, patchById)
router.post('/print', isLoggedAPI_SA_AS_PR, printDocument)
// router.post('/', create)
// router.post('/', create)

module.exports = router
