const express = require('express');
const mongoose = require('mongoose');
const User = require('../models/User');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/', async (req, res, next) => {
  try {
    const userData = {
      email: req.body.email,
      password: req.body.password,
    };

    const user = new User(userData);
    user.generateToken();
    await user.save();

    return res.send(user);
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(422).send(e);
    }
    return next(e);
  }
});

router.post('/sessions', async (req, res, next) => {
  try {
    if (!req.body.email || !req.body.password) {
      return res.status(400).send({error: 'Email and password are required!'});
    }

    const user = await User.findOne({email: req.body.email});

    if (!user) {
      return res.status(422).send({error: 'Email or password is wrong!'});
    }

    const isMatch = await user.checkPassword(req.body.password);

    if (!isMatch) {
      return res.status(422).send({error: 'Email or password is wrong!'});
    }

    user.generateToken();
    await user.save();

    return res.send(user);
  } catch (e) {
    return next(e);
  }
});

router.get('/secret', auth, async (req, res, next) => {
  try {
    return res.send({message: 'Hello, ' + req.user.email});
  } catch (e) {
    return next(e);
  }
});

router.delete('/sessions', async (req, res, next) => {
  try {
    const token = req.get('Authorization');
    const message = {message: 'OK!'};

    if (!token) {
      return res.send(message);
    }

    const user = await User.findOne({token});

    if (!user) {
      return res.send(message);
    }

    user.generateToken();
    await user.save();

    return res.send(message);
  } catch (e) {
    return next(e);
  }
})

module.exports = router;