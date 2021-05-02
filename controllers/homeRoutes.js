const router = require('express').Router();
const { User, Blog, Comment } = require('../models');

// get all blogs and render to homepage
router.get('/', async (req, res) => {
  try {
    // finding all blogs and including username from User model
    const blogData = await Blog.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });
    // creating a new array of json data from blogData
    const blogs = blogData.map((blog) => blog.get({ plain: true }));
    // rendering homepage and passing through an object of data to be used
    res.render('homepage', {
      blogs,
      logged_in: req.session.logged_in,
      page: 'HOME',
    });
  } catch (e) {
    res.status(500).json(e);
  }
});

// login
router.get('/login', async (req, res) => {
  // if true,
  return req.session.logged_in
    ? // then redirect to root (home)
      res.redirect('/')
    : // otherwise, render login page and set page name to LOGIN
      res.render('login', { page: 'LOGIN' });
});

module.exports = router;
