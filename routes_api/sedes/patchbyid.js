const SedeModel = require('../../models/SedeModel')
module.exports = function (req, res) {
  const updateBody = req.body
  delete updateBody.propietario
  SedeModel.findByIdAndUpdate(req.params.id, {
    $set: updateBody
  }, {
    new: true
  }, function (err, data) {
    console.log(typeof err, typeof data)
    console.log(err, data)
    if (err) {
      res.status(500).send(err)
    } else if (data == null) {
      res.status(404).send({})
    } else {
      res.status(200).send(data)
    }
  })
}
