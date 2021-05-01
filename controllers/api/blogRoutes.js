const router = require('express').Router();
const { Blog, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/:id', withAuth, async (req, res) => {
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

    const userData = await User.findOne({ where: { id: req.session.user_id } });
    const blog = blogData.get({ plain: true });
    const comments = commentData.map((comment) => comment.get({ plain: true }));
    const user = userData.get({ plain: true });

    res.render('blog', {
      blog,
      comments,
      user,
      logged_in: req.session.logged_in,
      page: 'BLOG',
    });
  } catch (e) {
    console.log(e);
  }
});

router.post('/', withAuth, async (req, res) => {
  try {
    const blogData = await Blog.create({
      title: req.body.title,
      blog_content: req.body.blog_content,
      user_id: req.session.user_id,
    });
    console.log(blogData);
    res.status(200).json(blogData);
  } catch (e) {
    res.status(400).json(e);
  }
});

router.put('/:id', withAuth, async (req, res) => {
  try {
    const blogData = await Blog.update(
      {
        title: req.body.title,
        blog_content: req.body.blog_content,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    res.status(200).json(blogData);
  } catch (e) {
    res.status(400).json(e);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const blogData = await Blog.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });
    console.log(blogData);

    res.status(200).json(blogData);
  } catch (e) {
    res.status(400).json(e);
  }
});

module.exports = router;
