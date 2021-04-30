const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  try {
    const commentData = await Comment.create(req.body);
    console.log(commentData);
    res.status(200).json(commentData);
  } catch (e) {
    res.status(400).json(e);
  }
});

module.exports = router;
