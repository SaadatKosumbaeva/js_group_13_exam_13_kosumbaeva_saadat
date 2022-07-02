const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  filename: {
    type: String,
    required: true,
  },
  imagePath: String,
});

const ReviewSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  foodRate: {
    type: Number,
    required: true,
    min: 0,
    max: 5,
  },
  serviceRate: {
    type: Number,
    required: true,
    min: 0,
    max: 5,
  },
  interiorRate: {
    type: Number,
    required: true,
    min: 0,
    max: 5,
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
    min: 0,
    max: 5,
  },
  foodRate: {
    type: Number,
    default: 0,
    min: 0,
    max: 5,
  },
  serviceRate: {
    type: Number,
    default: 0,
    min: 0,
    max: 5,
  },
  interiorRate: {
    type: Number,
    default: 0,
    min: 0,
    max: 5,
  },
  images: [ImageSchema],
  reviews: [ReviewSchema],
});

ImageSchema.set('toJSON', {
  transform: (doc, ret,   options) => {
    delete ret.imagePath;
    return ret;
  }
});

PlaceSchema.set('toJSON', {
  transform: (doc, ret,   options) => {
    delete ret.imagePath;
    return ret;
  }
});

const Place = mongoose.model('Place', PlaceSchema);

module.exports = Place;
