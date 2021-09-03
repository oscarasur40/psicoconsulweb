var express = require('express')
var router = express.Router()
var SedeUserInfoModel = require('../../models/SedeUserInfoModel')

/* GET home page. */
router.get('/', function (req, res, next) {
  var skip = req.query.skip || 0
  var limit = req.query.limit || 10
  SedeUserInfoModel.find({}, null, {
    skip,
    limit
  }, function (err, userInfoBySede) {
    if (err) {
      res.status(500).send({
        message: 'Error al buscar la información de usuarios por sedes.',
        error: err
      })
    } else {
      res.send(userInfoBySede)
    }
  })
})

module.exports = router
