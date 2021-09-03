const ResumenHcModel = require('../../models/ResumenHcModel')

module.exports = function (req, res){
  var ResumenHcGet = req.params
  var queryIn = {}
   console.log(ResumenHcGet)
  queryIn = {
      paciente:  ResumenHcGet.idUser ,
      sede: ResumenHcGet.idSede
      
  }

  console.log(">>> QueryIn: ", queryIn)
  ResumenHcModel.find(queryIn, function (err, ResumenHcGet) {
      if (err) {
          console.log('err', err)
          res.status(404).send({
          message: 'Hubo un error al crear al Consentimiento.',
          error: err
          })
      }

      res.status(201).send(ResumenHcGet)
  })
}
