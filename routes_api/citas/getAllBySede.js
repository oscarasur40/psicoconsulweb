var CitaModel = require('../../models/CitaModel')

module.exports = function (req, res) {
  let filter = null
  if (req.user.roles === "SP") {
    filter = {
      Sede: req.query.sede
    }
  } else {
    filter = {
      Sede: req.query.sede,
      Profesional: String(req.user._id)
    }
  }

  console.log("prueba: ", req.user.roles, String(req.user.nombre))

  const projection = req.query.projection || null

  console.log(">>> filter: ", filter)
  CitaModel.find(filter, projection, function (err, Formularios) {
    if (err) {
      res.status(500).send({
        message: 'Error al buscar las citas.',
        error: err
      })
    } else {
      let data = []
      if (req.user.roles === "SP") {
        Formularios.forEach(item => {
          if (String(item.Profesional.supervisorAsign) === String(req.user._id)) {
            data.push(item)
          }
        })
        res.send(data)
      } else {
        res.send(Formularios)
      }
    }
  })
}
