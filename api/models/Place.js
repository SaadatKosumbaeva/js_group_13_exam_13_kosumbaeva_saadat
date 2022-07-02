const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
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
  filename: {
    type: String,
    required: true,
  },
});

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

const PlaceSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
    required: true,
    unique: true,
  },
  description: String,
  mainImage: String,
  imagePath: String,
  averageRate: {
    type: Number,
    default: 0,
  },
  foodRate: {
    type: Number,
    default: 0,
  },
  serviceRate: {
    type: Number,
    default: 0,
  },
  interiorRate: {
    type: Number,
    default: 0,
  },
  images: [ImageSchema],
  reviews: [ReviewSchema],
});

PlaceSchema.set('toJSON', {
  transform: (doc, ret, options) => {
    delete ret.imagePath;
    return ret;
  }
});

const Place = mongoose.model('Place', PlaceSchema);

module.exports = Place;
