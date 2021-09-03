/* eslint-disable camelcase */
// TODO RUTA: Crear admin de sedevar express = require('express');
const express = require('express')
const router = express.Router()

const getDocument = require('./getDocument')
const create = require('./create')
const isLoggedAPI_SA_AS_PR = require('../../mw/isLoggedAPI_SA_AS_PR')


/* GET home page. */
router.get('/getDocumentos/:idSede/:idUser', isLoggedAPI_SA_AS_PR, getDocument)
router.post('/create', isLoggedAPI_SA_AS_PR, create) 

module.exports = router