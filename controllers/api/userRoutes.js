const router = require('express').Router();
const { User } = require('../../models');

// create new User
router.post('/', async (req, res) => {
  try {
    // create new user and post to User model
    const userData = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });
    // saving session details
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      // sending json data to Blog model to create user
      res.status(200).json(userData);
    });
    // console.log(userData);
  } catch (e) {
    res.status(400).json(e);
  }
});

// login
router.post('/login', async (req, res) => {
  try {
    // find user from User where user email = req.body.email
    const userData = await User.findOne({
      where: { email: req.body.email },
    });

    if (!userData) {
      res.status(400).json({ message: 'Please enter a valid email.' });
      return;
    }
    // getting user password and veryfying the password in User model
    const userPassword = await userData.verifyPassword(req.body.password);

    if (!userPassword) {
      res.status(400).json({ message: 'Password is incorrect.' });
      return;
    }
    // saving session details
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      // sending json data response
      res.json({ user: userData, message: `You are now logged in!` });
    });
  } catch (e) {
    res.status(400).json(e);
  }
});
// logout
router.post('/logout', (req, res) => {
  // if logged in,
  req.session.logged_in
    ? // then destroy session (logout)
      req.session.destroy(() => {
        // and end session (successful)
        res.status(204).end();
      })
    : // end session (bad request)
      res.status(400).end;
});

module.exports = router;
