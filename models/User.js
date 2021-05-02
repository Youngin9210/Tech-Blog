const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

class User extends Model {
  // conditional statement to verify given password
  verifyPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

// creating user model
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      // prevents duplicates
      unique: true,
      validate: {
        // validates email format
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        // must be longer than 8 characters
        len: [6],
      },
    },
  },
  {
    hooks: {
      // before new instance,
      beforeCreate: async (newUserData) => {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },
      beforeUpdate: async (updatedUserData) => {
        updatedUserData.password = await bcrypt.hash(
          updateUserData.password,
          10
        );
        return updatedUserData;
      },
    },
    // passing through sequelize db connection
    sequelize,
    timestamps: false,
    // make sure model name stays as given name
    freezeTableName: true,
    underscored: true,
    // setting model name
    modelName: 'user',
  }
);

module.exports = User;
