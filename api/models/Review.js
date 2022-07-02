const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  place: {
    type: Schema.Types.ObjectId,
    ref: 'Place',
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  foodRate: {
    type: Number,
    required: true,
  },
  serviceRate: {
    type: Number,
    required: true,
  },
  interiorRate: {
    type: Number,
    required: true,
  },
  datetime: {
    type: Date,
    default: Date.now,
  },
});

const Review = mongoose.model('Review', ReviewSchema);

module.exports = Review;
