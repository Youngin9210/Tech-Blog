const User = require('./User');
const Blog = require('./Blog');
const Comment = require('./Comment');

// user hasMany blogs
User.hasMany(Blog, {
  foreignKey: 'user_id',
});
// blog belongsTo user
Blog.belongsTo(User, {
  foreignKey: 'user_id',
});
// comments belongsTo user
Comment.belongsTo(User, {
  foreignKey: 'user_id',
});
// comments belongsTo post
Comment.belongsTo(Blog, {
  foreignKey: 'blog_id',
});
// user hasMany comments
User.hasMany(Comment, {
  foreignKey: 'user_id',
});
// blogs hasMany comments
Blog.hasMany(Comment, {
  foreignKey: 'blog_id',
});

module.exports = { User, Blog, Comment };
