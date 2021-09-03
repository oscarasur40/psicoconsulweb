const Disponibilidad = require('../../models/Disponibilidad')

module.exports = function (req, res) {
  const filter = req.query.filter || Object({})
    var queryIn = {}
    // const filter = req.query.filter || Object({})
    // console.log(filter)
    queryIn = {
        Sede:  req.params.sede,
        activo: true,
        "calendario.fecha" : req.params.date
    }
    console.log(queryIn)
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