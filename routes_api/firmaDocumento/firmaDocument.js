const HistoriaClinicaModel = require('../../models/HistoriaClinicaModel')

module.exports = function (req, res) {
    var queryIn = {
        Paciente: [ req.user._id ],
        Sede: req.user.Sedes[0]._id,
        "formulario.preguntas" : {$elemMatch:{"id" : "firma_del_padre"}}
    }

    var proyection = {
        "formulario.nombre": 1, "formulario.preguntas.id": 1, "formulario.preguntas.value": 1
    }

    FormularioModel.create(queryIn, function (err, Firmadocument) {
      if (err) {
        res.status(500).send({
          message: 'Error al cargar informacion de citas por paciente.',
          error: err
        })
      } else {
        res.status(201).send(Firmadocument)
      }
    })
}
