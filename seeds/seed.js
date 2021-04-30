const sequelize = require('../config/connection');
const { User, Blog, Comment } = require('../models');

const userData = require('./userData');
const blogData = require('./blogData');
const commentData = require('./commentData');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  // const blogs = blogData;

  for (const blog of blogData) {
    await Blog.create({
      ...blog,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  for (const comment of commentData) {
    await Comment.create({
      ...comment,
      user_id: users[Math.floor(Math.random() * users.length)].id,
      blog_id: Math.floor(Math.random() * blogData.length),
    });
  }
  process.exit(0);
};

seedDatabase();
