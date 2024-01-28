'use strict';
const {
  Model
} = require('sequelize');
const educator = require('./educator');
module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Course.belongsTo(models.educator, {
        foreignKey: "course_id",
      });
      Course.belongsTo(models.student, {
        foreignKey: "course_id",
      });
    }

    static createCourse(course_id,Name,completed){
      return this.create({
        course_id: course_id,
        Name: Name,
        completed: completed,
        chapters: 0,
        pages: 0,
      });
    }
    
    static deleteCourse(course_id){
      return this.destroy({
        where: {
          course_id: course_id,
        }
      });
    }
  }
  Course.init({
    course_id: DataTypes.INTEGER,
    Name: DataTypes.STRING,
    completed: DataTypes.BOOLEAN,
    chapters: DataTypes.INTEGER,
    pages: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Course',
  });
  return Course;
};