/* eslint-disable camelcase */
// TODO RUTA: Crear admin de sedevar express = require('express');
const express = require('express')
const router = express.Router()
const create = require('./create')
const getAll = require('./getAll')
const upDate = require('./upDate')
const isLoggedAPI_SA = require('../../mw/isLoggedAPI_SA')

/* GET home page. */
router.post('/', isLoggedAPI_SA, create)
router.get('/', isLoggedAPI_SA, getAll)
router.patch('/', isLoggedAPI_SA, upDate)

module.exports = router
