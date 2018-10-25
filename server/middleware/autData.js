const Question = require("../models/questions")

function authQuestion (req,res,next) {

  Question.findOne({_id : req.params.id})
    .populate('postBy')
    .then(function (question) {
      if (String(question.postBy._id) == String(req.userId)) {
        next()
      } else {
        res.status(500).json({
          message : `access danied`
        })
      }

    })
    .catch(function () {
      res.status(500).json({
        message : `access danied`
      })
    })
}

module.exports = authQuestion