const jwt = require('jsonwebtoken');
const Admin = require('../models/admin');

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.SECRET_TOKEN);
    console.log(decoded);
    const user = await Admin.findById(decoded.userId);
    console.log(user);
    if (!user) {
      throw new Error();
    }

    req.user = user;
    req.token = token;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Please authenticate' });
  }
};

module.exports = auth;