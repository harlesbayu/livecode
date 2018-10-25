const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const videoSchema = new Schema({
  videoId: {
    type: String,
  },
  detailVideo: [],
  like: [{type: Schema.Types.ObjectId, ref: 'User'}],
  unlike: [{type: Schema.Types.ObjectId, ref: 'User'}]
}, {
  timestamps: true
});


const Video = mongoose.model('Video', videoSchema);

module.exports = Video
