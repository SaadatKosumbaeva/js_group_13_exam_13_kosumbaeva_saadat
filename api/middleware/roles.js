const User = require('../models/User');

const roles = async (req, res, next) => {
  const token = req.get('Authorization');

  if (token) {
    const [user] = await User.find({token});
    req.user = user;
  }

  next();
};

module.exports = roles;