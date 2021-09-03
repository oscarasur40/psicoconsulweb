// TODO RUTA: Crear admin de sedevar express = require('express');
const express = require('express')
const router = express.Router()
const create = require('./create')
const getAll = require('./getAll')
// eslint-disable-next-line camelcase
const isLoggedAPI_SA_AS_PR = require('../../mw/isLoggedAPI_SA_AS_PR')

const aws1 = require('../../.secrets/awskeys').aws1
const bucketName = require('../../.secrets/awskeys').bucketName

const multer = require('multer')
const multerS3 = require('multer-s3')
const aws = require('aws-sdk')
aws.config.update(aws1)

const s3 = new aws.S3({})

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: bucketName,
    acl: 'public-read',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: function (req, file, cb) {
      const name = `${req.query.sede || 'nosede'}/${req.query.tipo || 'general'}/${req.query.tipo_id}/${req.query.campo_id}`
      const ext = file.originalname.substring(file.originalname.lastIndexOf('.'), file.originalname.length)
      cb(null, name + ext)
    }
  })
})

/* GET home page. */
router.get('/', isLoggedAPI_SA_AS_PR, getAll)
router.post('/', isLoggedAPI_SA_AS_PR, upload.single('archivo'), create)
// router.patch('/:id', create)
// router.post('/', create)
// router.post('/', create)

module.exports = router
