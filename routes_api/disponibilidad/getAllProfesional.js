const Disponibilidad = require('../../models/Disponibilidad')

module.exports = function (req, res) {
  console.log(req.params)
    var queryIn = {}
    queryIn = {
        Sede:  req.params.sede, 
        Profesional:  req.params.profesional
    }
    console.log(">>",queryIn)
    Disponibilidad.find(queryIn, 
      function (err, Disponibilidad) {
        if (err) {
          res.status(500).send({
            message: 'Error al buscar todos los usuarios.',
            error: err
          })
        }
        
        res.send(Disponibilidad)
    });
}