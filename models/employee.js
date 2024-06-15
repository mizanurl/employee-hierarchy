'use strict';

module.exports = (sequelize, DataTypes) => {

  const Employee = sequelize.define('Employee', {
    name: DataTypes.STRING,
    positionId: DataTypes.INTEGER,
    managerId: DataTypes.INTEGER
  }, {});
  
  Employee.associate = function(models) {

    Employee.belongsTo(models.Position, { foreignKey: 'positionId' });
    
    Employee.hasMany(models.Employee, { as: 'subordinates', foreignKey: 'managerId' });
    Employee.belongsTo(Employee, {as: 'manager', foreignKey: 'managerId'});
  };
  
  return Employee;
};