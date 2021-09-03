const CommentModel = require('../../models/comment')

module.exports = function (req, res) {

  const filter = {
    sede: req.params.sede,
    Cita:  req.params.Cita,
    Paciente: req.params.Paciente,
    headComment: req.params.headComment
  }

  
  CommentModel.find(filter, function (err, comentario) {
    if (err) {
      res.status(500).send({
        message: 'Error al buscar las citas.',
        error: err
      })
    } else {
      res.send(comentario)
    }
  })
}