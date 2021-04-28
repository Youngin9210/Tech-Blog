const router = require('express').Router();
const { User, Blog, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    res.render('homepage', {
      logged_in: req.session.logged_in,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json(e);
  }
});

router.get('/login', async (req, res) => {
  return req.session.loggedIn ? res.redirect('/') : res.render('login');
});

module.exports = router;
