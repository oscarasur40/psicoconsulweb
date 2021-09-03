var CitaModel = require('../../models/CitaModel')

module.exports = function (req, res) {
  const skip = parseInt(req.query.skip) || 0
  const limit = parseInt(req.query.limit) || 10
  const filter = req.query.filter || Object({})
  const filter2 = req.query.filter2 ||null
  const projection = req.query.projection || null


  console.log('filter', filter)
  console.log('filter2 > ', filter2)
  CitaModel.find(filter, projection, {
    skip,
    limit
  }, function (err, Citas) {
    console.log("prueba carajo: ", Citas.length)
    if (err) {
      console.log("Table: ", err)
      res.status(500).send({
        message: 'Error al buscar los Citas.',
        error: err
      })
    } else {
      var pacientes = [];
    if(filter2 == null){
        res.send(Citas)
     
    }else{
      console.log("Si entro")

    
 
      Citas.forEach(function (task) {

        if(task.Paciente[0].identidad_sexual === filter2.identidad_sexual )
        {
        pacientes.push(task);
        }
        if(task.Paciente[0].genero_nacimiento === filter2.genero_nacimiento )
        {
        pacientes.push(task);
        console.log(">> Genero")
        }
        if(task.Paciente[0].rango_edad === filter2.rango_edad )
        {
        pacientes.push(task);
        }
        if(task.Paciente[0].escolaridad === filter2.escolaridad )
        {
        pacientes.push(task);
        }
         
      });
      res.send(pacientes)
      
    }
     
    

    }
  })
}
