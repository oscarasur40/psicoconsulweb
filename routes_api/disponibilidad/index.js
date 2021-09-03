// TODO RUTA: Crear admin de sedevar express = require('express');
const express = require('express')
const router = express.Router()
const create = require('./create')
const getAll = require('./getAll')
const getAllId = require('./getAllId')
const upDateID = require('./upDateID')
const getAllProfesional = require('./getAllProfesional')
const deleteDispo = require('./deleteDispo')
const isLoggedAPI_SA_AS_PR = require('../../mw/isLoggedAPI_SA_AS_PR')

/* GET home page. */
router.get('/getDisponibilidad/:sede/:date', isLoggedAPI_SA_AS_PR, getAll)
router.get('/getAllId/:sede/:id', isLoggedAPI_SA_AS_PR, getAllId)
router.get('/getAllProfesional/:sede/:profesional', isLoggedAPI_SA_AS_PR, getAllProfesional)
router.post('/', isLoggedAPI_SA_AS_PR, create)
router.patch('/', isLoggedAPI_SA_AS_PR, upDateID)
router.delete('/deleteDispo/:id', isLoggedAPI_SA_AS_PR, deleteDispo)


module.exports = router