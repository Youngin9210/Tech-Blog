const router = require('express').Router();
const { Blog } = require('../models');
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

// router.get('/update/:id', withAuth, async (req, res) => {
//   try {
//     const blogData = await Blog.findByPk(req.params.id);
//   } catch (e) {}
// });

router.get('/blog/:id', withAuth, async (req, res) => {
  try {
    const blogData = await Blog.findByPk(req.params.id);

    const blog = blogData.get({ plain: true });
    // console.log(blogData);
    console.log(blog);
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
