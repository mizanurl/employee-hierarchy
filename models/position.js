'use strict';

module.exports = (sequelize, DataTypes) => {

  const Position = sequelize.define('Position', {
    name: DataTypes.STRING
  }, {});

  Position.associate = (models) => {
    Position.hasMany(models.Employee, { foreignKey: 'positionId' });
  };
  
  return Position;
};