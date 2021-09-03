var CitaModel = require('../../models/CitaModel')

module.exports = function (req, res) {
  const skip = parseInt(req.query.skip) || 0
  const limit = parseInt(req.query.limit) || 10
  const filter = req.query.filter || Object({})
  const filter2 = req.query.filter2 || Object({})
  const projection = req.query.projection || null

  
  CitaModel.find(filter, projection, {
    skip,
    limit
  }, function (err, Citas) {
    if (err) {
      res.status(500).send({
        message: 'Error al buscar los Citas.',
        error: err
      })
    } else {

    //   var pacientes = [];
 
    //   Citas.forEach(function (task) {
 
    //    if(!task.Paciente[0].identidad_sexual === ""){
    //     task.Paciente[0].identidad_sexual = "N/A"
    //    }else{
    //     if(task.Paciente[0].identidad_sexual === filter2.identidad_sexual )
    //     {
    //     pacientes.push(task);
    //     }
    //    } 

         
    // });
    
      res.send(Citas)

    }
  })
}
