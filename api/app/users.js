const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
const User = require('../models/User');
const auth = require('../middleware/auth');
const config = require('../config');
const {nanoid} = require("nanoid");

const router = express.Router();

router.post('/', async (req, res, next) => {
  try {
    if (!req.body.email || !req.body.password || !req.body.displayName) {
      return res.status(422).send({error: 'Email, password, and display name are required!'});
    }

    const userData = {
      email: req.body.email,
      password: req.body.password,
      displayName: req.body.displayName,
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
      return res.status(422).send({error: 'Email and password are required!'});
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

router.post('/facebookLogin', async (req, res, next) => {
  try {
    const inputToken = req.body.authToken;
    const accessToken = config.facebook.appId + '|' + config.facebook.appSecret;
    const debugTokenUrl = `https://graph.facebook.com/debug_token?input_token=${inputToken}&access_token=${accessToken}`;

    const response = await axios.get(debugTokenUrl);

    if (response.data.data.error) {
      return res.status(401).send({error: 'Facebook token incorrect'});
    }

    if (req.body.id !== response.data.data.user_id) {
      return res.status(401).send({error: 'Wrong User ID'});
    }

    let user = await User.findOne({facebookId: req.body.id});

    if (!user) {
      user = new User({
        email: req.body.email,
        password: nanoid(),
        facebookId: req.body.id,
        displayName: req.body.name,
      });
    }

    user.generateToken();
    await user.save();

    return res.send(user);
  } catch (e) {
    next(e);
  }
});

router.get('/secret', auth, async (req, res, next) => {
  try {
    return res.send({message: 'Hello, ' + req.user.displayName});
  } catch (e) {
    return next(e);
  }
});

router.delete('/sessions', async (req, res, next) => {
  try {
    const token = req.get('Authorization');
    const message = {message: 'OK!'};

    if (!token) return res.send(message);

    const user = await User.findOne({token});

    if (!user) return res.send(message);

    user.generateToken();
    await user.save();

    return res.send(message);
  } catch (e) {
    return next(e);
  }
})

module.exports = router;