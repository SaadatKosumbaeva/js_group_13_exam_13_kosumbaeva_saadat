const express = require('express');
const Place = require('../models/Place');
const Image = require('../models/Image');
const Review = require('../models/Review');
const auth = require('../middleware/auth');
const permit = require('../middleware/permit');
const {images} = require('../multer');
const {promises: fs} = require('fs');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const places = await Place.find();

    return res.send(places);
  } catch (e) {
    next(e);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const place = await Place.findById(req.params.id);

    if (!place) {
      return res.status(404).send({error: `Not found by id = ${req.params.id}`});
    }

    const images = await Image.find({place: req.params.id});
    const reviews = await Review.find({place: req.params.id}).populate('user', 'displayName');

    const data = {
      place,
      images,
      reviews,
    };

    return res.send(data);
  } catch (e) {
    next(e);
  }
});

router.post('/', auth, images.single('mainImage'), async (req, res, next) => {
  try {
    if (!!req.body.agree !== true) {
      return res.status(422).send({error: `Please give an agreement to grant rights to this information`});
    }

    const place = new Place({
      user: req.user._id,
      title: req.body.title,
      description: req.body.description ? req.body.description : null,
      mainImage: req.file ? req.file.filename : null,
      imagePath: req.file ? req.file.path : null,
    });

    await place.save();

    return res.send(place);
  } catch (e) {
    next(e);
  }
});

router.delete('/image/:id', auth, permit('admin'), async (req, res, next) => {
  try {
    const place = await Place.findById(req.params.id);

    if (!place) {
      return res.status(404).send({error: `Not found by id = ${req.params.id}`});
    }

    await fs.unlink(place.imagePath);

    place.mainImage = null;
    place.imagePath = null;

    await place.save();

    return res.send(place);
  } catch (e) {
    next(e);
  }
});

router.delete('/:id', auth, permit('admin'), images.single('mainImage'), async (req, res, next) => {
  try {
    const place = await Place.findById(req.params.id);

    if (!place) {
      return res.status(404).send({error: `Not found by id = ${req.params.id}`});
    }

    await Image.deleteMany({place: req.params.id});
    await Review.deleteMany({place: req.params.id});
    await Place.findByIdAndDelete(req.params.id);

    return res.send({message: `Deleted by id = ${req.params.id}`});
  } catch (e) {
    next(e);
  }
});

module.exports = router;