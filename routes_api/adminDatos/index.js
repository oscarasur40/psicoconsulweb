/* eslint-disable camelcase */
// TODO RUTA: Crear admin de sedevar express = require('express');
const express = require('express')
const router = express.Router()
const create = require('./create')
const get = require('./get')
const getDias = require('./getDias')
const getTime = require('./getTime')
const upDate = require('./upDate')
const createDias = require('./createDias')
const deleteDias = require('./deleteDias')
const buscarDias = require('./buscarDias')
const createTime = require('./createTime')
const isLoggedAPI_AS_PR_PA = require('../../mw/isLoggedAPI_AS_PR_PA')


/* GET home page. */

router.post('/', isLoggedAPI_AS_PR_PA, create) 
router.get('/:Sede', isLoggedAPI_AS_PR_PA, get) 
router.patch('/:id', isLoggedAPI_AS_PR_PA, upDate) 
router.post('/createDias', isLoggedAPI_AS_PR_PA, createDias) 
router.get('/getDias/:Sede', isLoggedAPI_AS_PR_PA, getDias) 
router.delete('/deleteDias/:id', isLoggedAPI_AS_PR_PA, deleteDias) 
router.get('/buscarDias/:Sede/:dia_no_laboral', isLoggedAPI_AS_PR_PA, buscarDias) 
router.patch('/createTime/:Sede', isLoggedAPI_AS_PR_PA, createTime) 
router.get('/getTime/:Sede', isLoggedAPI_AS_PR_PA, getTime) 
module.exports = router