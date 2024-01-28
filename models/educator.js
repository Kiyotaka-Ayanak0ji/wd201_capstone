'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Educator extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Educator.hasMany(models.student, {
        foreignKey: "faculty_id",
      });
      Educator.hasMany(models.course, {
        foreign_key: "course_id",
      });
    }
  }
  Educator.init({
    faculty_id: DataTypes.INTEGER,
    course_id: DataTypes.INTEGER,
    Name: DataTypes.STRING,
    Age: DataTypes.INTEGER,
    Department: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Educator',
  });
  return Educator;
};