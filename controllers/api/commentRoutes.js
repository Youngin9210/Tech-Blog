const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');
// create comment
router.post('/', withAuth, async (req, res) => {
  try {
    // creating new comment and posting to Comment model
    const commentData = await Comment.create(req.body);
    // sending json data to Comment model to create comment
    res.status(200).json(commentData);
  } catch (e) {
    res.status(400).json(e);
  }
});

module.exports = router;
