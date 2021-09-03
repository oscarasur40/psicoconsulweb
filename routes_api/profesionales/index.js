/* eslint-disable camelcase */
// TODO RUTA: Crear admin de sedevar express = require('express');
const express = require('express')
const router = express.Router()
const create = require('./create')
const getAll = require('./getAll')
const terapeuta = require('./terapeuta');
const docenteSup = require('./docenteSup');
const supervisorAsign = require('./supervisorAsign');
const getAllSupervisores = require('./getAllSupervisores')
const getAllProfe = require('./getAllProfe')
const update = require('./update');
const updateFirma = require('./updateFirma');
const validarId = require('./validarId');
const isLoggedAPI_SA_AS = require('../../mw/isLoggedAPI_SA_AS')
const isLoggedAPI_SA_AS_PR = require('../../mw/isLoggedAPI_SA_AS_PR')
const getProfesionalSede = require('./getProfesionalSede')
const getAllProfesionalesSuper = require('./getAllProfesionalesSuper')
const updateFoto = require('./updateFoto')

/* GET home page. */
router.get('/', isLoggedAPI_SA_AS_PR, getAll)
router.get('/terapeuta', isLoggedAPI_SA_AS, terapeuta)
router.get('/validarId', isLoggedAPI_SA_AS, validarId)
router.get('/docenteSup', isLoggedAPI_SA_AS, docenteSup)
router.get('/practicante/:sede/:supervisorAsign', supervisorAsign)
router.get('/getAllSupervisores/:sede/:supervisorAsign', getAllSupervisores)
router.get('/getAllProfe/:sede/:profesional', getAllProfe)
router.get('/getAllProfesionalesSuper/:sede/:supervisor', getAllProfesionalesSuper)
router.get('/getProfesionalSede/:sede', isLoggedAPI_SA_AS, getProfesionalSede)
router.post('/', isLoggedAPI_SA_AS, create)
router.patch('/update', isLoggedAPI_SA_AS, update)
router.patch('/updateFirma', isLoggedAPI_SA_AS, updateFirma)
router.patch('/updateFoto', isLoggedAPI_SA_AS, updateFoto)

module.exports = router
