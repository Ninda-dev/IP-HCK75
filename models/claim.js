'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Claim extends Model {

    static associate(models) {
      Claim.belongsTo(models.User);
      Claim.belongsTo(models.Product);
    }
  }
  Claim.init({
    date: DataTypes.DATE,
    UserId: DataTypes.INTEGER,
    ProductId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Claim',
  });
  return Claim;
};