// TODO RUTA: Crear admin de sedevar express = require('express');
const express = require('express')
const router = express.Router()
const create = require('./create')
const createAutomatico = require('./createUtomatico')
const getAll = require('./getAll')
const patchById = require('./patchById')
const getAllBySede = require('./getAllBySede')
const getAllBySedeUni = require('./sedeUni')
const getAllBySedePaciente = require('./getAllByPaciente')
const getAllSedeProfesional = require('./getAllBySedeProfesional')
const getAllSedeProfesionalPaciente = require('./getAllBySedeProfesionalPaciente')
const getInformeCitas = require("./getInformeCita")
// eslint-disable-next-line camelcase
const isLoggedAPI_SA_AS_PR = require('../../mw/isLoggedAPI_SA_AS_PR')
const postSession = require('./createSession')
const postPrimeraVez = require('./createPrimeraVez')
const getCitasSedeProfePaciente = require('./getCitasSedeProfePaciente')
const cancelarCitasU = require('./cancelarCitasU')

const insertCommentSave = require('./insertCommentSave')

const insertCommentGet = require('./insertCommentGet')

/* GET home page. */
router.get('/', isLoggedAPI_SA_AS_PR, getAll)
router.get('/informe', isLoggedAPI_SA_AS_PR, getInformeCitas)
router.get('/sede', isLoggedAPI_SA_AS_PR, getAllBySede)
router.get('/sedeUni', isLoggedAPI_SA_AS_PR, getAllBySedeUni)
router.get('/sedePaciente', isLoggedAPI_SA_AS_PR, getAllBySedePaciente)
router.get('/sede_profesional/:sede/:profesional', isLoggedAPI_SA_AS_PR, getAllSedeProfesional)
router.get('/sede_profesional_paciente/:sede/:profesional', isLoggedAPI_SA_AS_PR, getAllSedeProfesionalPaciente)
router.get('/insertCommentGet/:sede/:Cita/:Paciente/:headComment',  isLoggedAPI_SA_AS_PR, insertCommentGet)
// router.get('/profesional')
router.post('/', isLoggedAPI_SA_AS_PR, create)
router.post('/citasAutomatica', isLoggedAPI_SA_AS_PR, createAutomatico)
router.post('/insertCommentSave', isLoggedAPI_SA_AS_PR, insertCommentSave)
router.patch('/:id', isLoggedAPI_SA_AS_PR, patchById)
router.delete('/cancelarCitasU/:id', isLoggedAPI_SA_AS_PR, cancelarCitasU)
router.post('/primeraVez', isLoggedAPI_SA_AS_PR, postPrimeraVez)
router.post('/session', isLoggedAPI_SA_AS_PR, postSession)
router.get('/getCitasSedeProfePaciente/:sede/:profesional/:paciente', isLoggedAPI_SA_AS_PR, getCitasSedeProfePaciente)
// router.post('/', create)
// router.post('/', create)


module.exports = router
