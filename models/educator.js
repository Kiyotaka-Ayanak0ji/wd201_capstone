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
      // define association here
    }
  }
  Educator.init({
    Id: DataTypes.INTEGER,
    Name: DataTypes.STRING,
    Age: DataTypes.INTEGER,
    Department: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Educator',
  });
  return Educator;
};