'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Profile.hasMany(models.Message,{as:'SMessages',foreignKey:'sendId'})
      Profile.hasMany(models.Message,{as:'RMessages',foreignKey:'raciveId'})
    }/* end of associate */
  };
  Profile.init({
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    phone: DataTypes.INTEGER,
    userId: {type:DataTypes.STRING,unique:true},
    img_url:{type:DataTypes.STRING,allowNull:true},
    pio: {type: DataTypes.STRING(300),allowNull:true},
  }, {
    sequelize,
    modelName: 'Profile',
  });
  return Profile;
};