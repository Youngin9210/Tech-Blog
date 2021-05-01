const router = require('express').Router();
const { Blog, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

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
    // console.log(blog);
    // console.log('-----------------');
    // console.log(comments);
    res.render('blog', { blog, comments, logged_in: req.session.logged_in });
  } catch (e) {
    console.log(e);
  }
});

router.put('/:id', withAuth, async (req, res) => {
  try {
    const blogData = await Blog.Update(req.body, {
      where: {
        id: req.body.id,
      },
    });

    res.status(200).json(blogData);
  } catch (e) {
    res.status(400).json(e);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const blogData = await Blog.destroy({
      where: {
        id: req.body.id,
        user_id: req.body.user_id,
      },
    });

    res.status(200).json(blogData);
  } catch (e) {
    res.status(400).json(e);
  }
});

module.exports = router;
