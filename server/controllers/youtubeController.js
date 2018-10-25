const Video = require("../models/video")
const User = require("../models/user")

module.exports = {

  mylikevideos: function (req,res) {
    Video.find({ like : req.userId })
      .populate('like')
      .then(video => {
        res.status(200).json({
          video
        })
      })
  },

  like: function (req,res) {

    Video.findOne({ videoId : req.body.videoId })
      .then((video) => {
        if(video){

          Video.findOne({ videoId : req.body.videoId })
          .populate(
            { path: 'like',
              match: { _id : { $eq: req.userId }}}
          )
          .then(function (videos) {
            if(videos.like.length === 0){
              Video.update( { videoId: req.body.videoId },
                { $push: { like: req.userId } })
                .then(function () {
                  Video.update( { videoId: req.body.videoId },
                    { $pull: { unlike: req.userId } })
                    .then(function () {
                      res.status(201).json({
                        message: `like success`
                      })
                    })
                })
            } else {
              res.status(500).json({
                message: `you can't like again`
              })
            }
          })

        } else {
          // console.log(req.body.detailVideo)
          let dataVideo = new Video({
            videoId : req.body.videoId,
            detailVideo: req.body.detailVideo,
            like: req.userId
          })

          dataVideo.save()
            .then((video) => {
              Video.update( { videoId : req.body.videoId },
                { $push: { like: req.userId } })
                then(() => {})

                res.status(200).json({
                  message: 'like success'
                })

            }).catch((err) => {
              
            });
        }
      }).catch((err) => {
        
      });

  },

  unlike: function (req,res) {

    Video.findById(req.params.id)
    .populate(
      { path: 'unlike',
        match: { _id : { $eq: req.userId }}}
    )
    .then(function (question) {
      if(question.unlike.length === 0){
        Question.findByIdAndUpdate(req.params.id,
          { $push: { unlike: req.userId } })
          .then(function () {
            Question.findByIdAndUpdate(req.params.id,
              { $pull: { like: req.userId } })
              .then(function () {
                res.status(201).json({
                  message: `upvote success`
                })
              })
          })
          .catch(function(err) {
            res.status(500).json({
              message: `you can't unlike again`
            })
          })
      } else {
        res.status(500).json({
          message: `you can't unlike again`
        })
      }
    })

  },
}