// TODO RUTA: Crear admin de sedevar express = require('express');
const express = require('express')
const router = express.Router()
const create = require('./create')
const getAll = require('./getAll')
const patchById = require('./patchById')
// eslint-disable-next-line camelcase
const isLoggedAPI_SA_AS = require('../../mw/isLoggedAPI_SA_AS')
const isLoggedAPI_SA_AS_PR = require('../../mw/isLoggedAPI_SA_AS_PR')

/* GET home page. */
router.get('/', isLoggedAPI_SA_AS_PR, getAll)
router.post('/', isLoggedAPI_SA_AS, create)
router.patch('/:id', isLoggedAPI_SA_AS, patchById)
// router.post('/', create)
// router.post('/', create)

module.exports = router
