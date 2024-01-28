'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Student extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Student.hasMany(models.courses,{
        foreignKey: "course_id",
      })
      Student.belongsTo(models.educator ,{
        foreignKey: "faculty_id",
      });
    }

    static assignEducator(faculty_id){
      return this.update({
        where:{
          faculty_id: faculty_id,
        }
      });
    }
  }
  Student.init({
    Id: DataTypes.INTEGER,
    faculty_id: DataTypes.INTEGER,
    Name: DataTypes.STRING,
    Age: DataTypes.INTEGER,
    Department: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Student',
  });
  return Student;
};