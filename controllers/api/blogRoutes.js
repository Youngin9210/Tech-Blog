const router = require('express').Router();
const { Blog, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// get blog by id
router.get('/:id', withAuth, async (req, res) => {
  try {
    // find blog based on id of req.params
    const blogData = await Blog.findByPk(req.params.id, {
      include: [
        {
          // including username from User model
          model: User,
          attributes: ['username'],
        },
      ],
    });
    // finding all comment data from Comment model where blog_id of Comment is equal to requested blog id
    const commentData = await Comment.findAll({
      where: { blog_id: req.params.id },
      // include username from User model
      include: [{ model: User, attributes: ['username'] }],
    });
    // get userData from User model where user_id = session id
    const userData = await User.findOne({ where: { id: req.session.user_id } });
    // converting json data to a normal object
    const blog = blogData.get({ plain: true });
    // mapping plain object data into a new array
    const comments = commentData.map((comment) => comment.get({ plain: true }));
    // converting json data to a normal object
    const user = userData.get({ plain: true });
    // rendering blog.handlebars and passing through object data
    res.render('blog', {
      blog,
      comments,
      user,
      logged_in: req.session.logged_in,
      page: 'BLOG',
    });
  } catch (e) {
    res.status(400).json(e.message());
  }
});
// create new blog
router.post('/', withAuth, async (req, res) => {
  try {
    // creating new blog and posting to Blog model
    const blogData = await Blog.create({
      title: req.body.title,
      blog_content: req.body.blog_content,
      user_id: req.session.user_id,
    });
    // sending json data to Blog model to create blog
    res.status(200).json(blogData);
  } catch (e) {
    res.status(400).json(e.message());
  }
});
// update blog
router.put('/:id', withAuth, async (req, res) => {
  try {
    // updating blog in Blog model where blog id = req.params.id
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
    // sending json data to Blog model for update
    res.status(200).json(blogData);
  } catch (e) {
    res.status(400).json(e.message());
  }
});
// delete blog
router.delete('/:id', withAuth, async (req, res) => {
  try {
    // deleting blog where blog id = req.params.id AND blog user_id = req.session.user_id
    const blogData = await Blog.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });
    // sending json data to Blog model for deletion
    res.status(200).json(blogData);
  } catch (e) {
    res.status(400).json(e.message());
  }
});

module.exports = router;
