const router = require('express').Router();
const { Blog } = require('../models');
const withAuth = require('../utils/auth');

// get logged in user's blogs
router.get('/', withAuth, async (req, res) => {
  try {
    // find all blog data from Blog model where blog user_id = req.session.user_id
    const blogData = await Blog.findAll({
      where: {
        user_id: req.session.user_id,
      },
    });
    // mapping plain object data into a new array
    const blogs = blogData.map((blog) => blog.get({ plain: true }));
    // rendering dashboard and passing through object data
    res.render('dashboard', {
      blogs,
      logged_in: req.session.logged_in,
      page: 'DASHBOARD',
    });
  } catch (e) {
    res.status(400).json(e);
  }
});

// update/edit blog form
router.get('/update/:id', withAuth, async (req, res) => {
  try {
    // find blog based on id of req.params
    const blogData = await Blog.findByPk(req.params.id);
    // mapping plain object data into a new array
    const blog = blogData.get({ plain: true });
    // rendering blogUpdate.handlebars and passing through object data
    res.render('blogUpdate', {
      blog,
      logged_in: req.session.logged_in,
      user_id: req.session.user_id,
      blog_id: req.body.id,
      page: 'UPDATE BLOG',
    });
  } catch (e) {
    res.status(400).json(e);
  }
});
// create new blog form
router.get('/create', withAuth, async (req, res) => {
  // render newBlog.handlebars and passing through object data
  res.render('newBlog', {
    logged_in: req.session.logged_in,
    user_id: req.session.user_id,
    page: 'CREATE BLOG',
  });
});

module.exports = router;
