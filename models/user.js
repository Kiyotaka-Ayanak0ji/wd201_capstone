'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.courses, {
        foreignKey: "course_id",
      })
    }
  }
  User.init({
    Id: DataTypes.INTEGER,
    role: DataTypes.STRING,
    faculty_id: DataTypes.INTEGER,
    Name: DataTypes.STRING,
    Age: DataTypes.INTEGER,
    Department: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};