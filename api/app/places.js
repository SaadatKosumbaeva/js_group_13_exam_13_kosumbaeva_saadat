const express = require('express');
const Place = require('../models/Place');
const auth = require('../middleware/auth');
const permit = require('../middleware/permit');
const {images} = require('../multer');
const {promises: fs} = require('fs');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const places = await Place.find().sort({'_id': -1});

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

    return res.send(place);
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

router.patch('/:id', auth, images.single('image'), async (req, res, next) => {
  try {
    const place = await Place.findById(req.params.id);

    if (req.file) {
      const image = {
        user: req.user._id,
        filename: req.file.filename,
        imagePath: req.file.path,
      };

      place.images.push(image);
      await place.save();
    } else if (req.body) {
      const review = {
        user: req.user._id,
        description: req.body.description,
        foodRate: req.body.foodRate,
        serviceRate: req.body.serviceRate,
        interiorRate: req.body.interiorRate,
      };

      place.reviews.push(review);

      const totalRates = place.reviews.reduce((previousValue, currentValue) => previousValue + (currentValue.foodRate + currentValue.serviceRate + currentValue.interiorRate), 0);
      place.averageRate = Math.round((totalRates / place.reviews.length) * 10 / 30);

      const totalFoodRate = place.reviews.reduce((previousValue, currentValue) => previousValue + (currentValue.foodRate), 0);
      place.foodRate = Math.round((totalFoodRate / place.reviews.length) * 10) / 10;

      const totalServiceRate = place.reviews.reduce((previousValue, currentValue) => previousValue + (currentValue.serviceRate), 0);
      place.serviceRate = Math.round((totalServiceRate / place.reviews.length) * 10) / 10;

      const totalInteriorRate = place.reviews.reduce((previousValue, currentValue) => previousValue + (currentValue.interiorRate), 0);
      place.interiorRate = Math.round((totalInteriorRate / place.reviews.length) * 10) / 10;

      await place.save();
    } else {
      return res.status(422).send({error: `Please enter the data`});
    }

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

    if (place.imagePath) {
      await fs.unlink(place.imagePath);
    }

    await Place.findByIdAndDelete(req.params.id);

    return res.send({message: `Deleted by id = ${req.params.id}`});
  } catch (e) {
    next(e);
  }
});

module.exports = router;