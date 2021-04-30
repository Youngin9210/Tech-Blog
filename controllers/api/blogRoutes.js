const router = require('express').Router();
const { Blog, User, Comment } = require('../../models');

router.get('/:id', async (req, res) => {
  try {
    const blogData = await Blog.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    const commentData = await Comment.findAll({
      where: { blog_id: req.params.id },
      include: [{ model: User, attributes: ['username'] }],
    });
    const blog = blogData.get({ plain: true });
    const comments = commentData.map((comment) => comment.get({ plain: true }));
    // console.log(blogData);
    console.log(blog);
    console.log('-----------------');
    console.log(comments);
    res.render('blog', { blog, logged_in: req.session.logged_in });
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
