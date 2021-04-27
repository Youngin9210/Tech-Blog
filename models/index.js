const User = require('./User');
const Blog = require('./Blog');
const Comment = require('./Comment');

// user hasMany blogs
User.hasMany(Blog, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});
// user hasMany comments
User.hasMany(Comment, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});
// blog belongsTo user
Blog.belongsTo(User, {
  foreignKey: 'user_id',
});
// blogs hasMany comments
Blog.hasMany(Comment, {
  foreignKey: 'blog_id',
  onDelete: 'CASCADE',
});
// comments belongsTo user
Comment.belongsTo(User, {
  foreignKey: 'user_id',
});
// comments belongsTo post
Comment.belongsTo(Post, {
  foreignKey: 'blog_id',
});

module.exports = { User, Blog, Comment };
