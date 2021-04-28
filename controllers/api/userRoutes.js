const router = require('express').Router();
const { User } = require('../../models');

router.post('/', async (req, res) => {
  try {
    const userData = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.username = userData.username;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
    console.log(userData);
  } catch (e) {
    console.log(e);
    res.status(400).json(e);
  }
});

router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({
      where: { username: req.body.username },
    });

    if (!userData) {
      res.status(400).json({ message: 'Please enter a valid username.' });
      return;
    }

    const userPassword = await userData.checkPassword(req.body.password);

    if (!userPassword) {
      res.status(400).json({ message: 'Password is incorrect.' });
      return;
    }

    req.session.save(() => {
      req.session.logged_in = true;

      res.json({ user: userData, message: `Welcome, ${userData.username}` });
    });
  } catch (e) {
    res.status(400).json(e);
  }
});

module.exports = router;
