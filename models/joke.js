'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class joke extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.user.belongsToMany(models.joke, {through: 'userjoke'})
    }
  };
  joke.init({
    type: DataTypes.STRING,
    setup: DataTypes.STRING,
    punchline: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'joke',
  });
  return joke;
};