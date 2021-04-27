const router = require('express').Router();

router.get('/', async (req, res) => {
  try {
    res.render('homepage');
  } catch (e) {
    console.log(e);
    res.status(500).json(e);
  }
});

router.get('/login', async (req, res) => {
  return req.session.loggedIn ? res.redirect('/') : res.render('login');
});

module.exports = router;
