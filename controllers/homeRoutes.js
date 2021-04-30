const router = require('express').Router();
const { User, Blog, Comment } = require('../models');

router.get('/', async (req, res) => {
  try {
    const blogData = await Blog.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });
    const blogs = blogData.map((blog) => blog.get({ plain: true }));
    res.render('homepage', { blogs, logged_in: req.session.logged_in });
  } catch (e) {
    console.log(e);
    res.status(500).json(e);
  }
});

router.get('/login', async (req, res) => {
  return req.session.logged_in ? res.redirect('/') : res.render('login');
});

module.exports = router;
