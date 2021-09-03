const CommentModel = require('../../models/comment')
const moment = require('moment')

module.exports = function (req, res) {

    var comment = req.body

    CommentModel.create(comment, function (err, comment) {
      if (err) {
        res.status(500).send({
          message: 'Error al crear la Sede.',
          error: err
        })
      } else {
        res.status(201).send(comment)
       
       // res.status(201).send({message: "Creada con exito"})
      }
    })
 


 
}