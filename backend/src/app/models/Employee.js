module.exports = (sequelize, DataTypes) => {
  const Employee = sequelize.define("Employee", {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    departament: DataTypes.STRING
  });

  return Employee;
};
