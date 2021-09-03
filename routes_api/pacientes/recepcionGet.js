const RecepcionPaciente = require('../../models/RecepcionPaciente')

module.exports = function (req, res){
  var RecepcionPacienteGet = req.params
  var queryIn = {}
   console.log(RecepcionPacienteGet)
  queryIn = {
      Paciente: [ RecepcionPacienteGet.idUser ],
      sede: [RecepcionPacienteGet.idSede]
      
  }

  console.log(">>> QueryIn: ", queryIn)
  RecepcionPaciente.find(queryIn, function (err, RecepcionPacienteGet) {
      if (err) {
          console.log('err', err)
          res.status(404).send({
          message: 'Hubo un error al crear al Consentimiento.',
          error: err
          })
      }
      
      res.status(201).send(RecepcionPacienteGet)
  })
}

