const router = require('express').Router();
const { Blog, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
  try {
    const blogData = await Blog.findAll({
      where: {
        user_id: req.session.user_id,
      },
    });
    const blogs = blogData.map((blog) => blog.get({ plain: true }));
    // console.log(blogs);
    // console.log(req.session.user_id);

    res.render('dashboard', { blogs, logged_in: req.session.logged_in });
  } catch (e) {
    console.log(e);
    res.status(400).json(e);
  }
});

router.get('/update/:id', withAuth, async (req, res) => {
  try {
    const blogData = await Blog.findByPk(req.params.id);

    const blog = blogData.get({ plain: true });
    res.render('blogUpdate', {
      blog,
      logged_in: req.session.logged_in,
      user_id: req.session.user_id,
      blog_id: req.body.id,
    });
  } catch (e) {
    res.status(400).json(e);
  }
});

module.exports = router;
