'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Message.belongsTo(models.Profile,{as:'SProfiles',foreignKey:'sendId'})
      Message.belongsTo(models.Profile,{as:'RProfiles',foreignKey:'raciveId'})
    }
  };
  Message.init({
    content: DataTypes.STRING,
    sendId: DataTypes.STRING,
    raciveId: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Message',
  });
  return Message;
};