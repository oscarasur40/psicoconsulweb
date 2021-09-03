// TODO RUTA: Crear admin de sedevar express = require('express');
const express = require('express')
const router = express.Router()
const create = require('./create')
const getAll = require('./getAll')
const patchById = require('./patchById')
const getAllBySede = require('./getAllBySede')
// eslint-disable-next-line camelcase
const isLoggedAPI_SA_AS_PR = require('../../mw/isLoggedAPI_SA_AS_PR')

/* GET home page. */
router.get('/', isLoggedAPI_SA_AS_PR, getAll)
router.get('/sede', isLoggedAPI_SA_AS_PR, getAllBySede)
// router.get('/profesional')
router.post('/', isLoggedAPI_SA_AS_PR, create)
router.patch('/:id', isLoggedAPI_SA_AS_PR, patchById)
// router.post('/', create)
// router.post('/', create)

module.exports = router
