const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
});

PlaceSchema.set('toJSON', {
  transform: (doc, ret, options) => {
    delete ret.imagePath;
    return ret;
  }
});

const Place = mongoose.model('Place', PlaceSchema);

module.exports = Place;
