/* jshint indent: 2 */

const { Sequelize } = require("sequelize");

module.exports = function (sequelize, DataTypes) {
  return Sequelize.define(
    "usuario_",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      login: {
        type: DataTypes.STRING(18),
        allowNull: false,
      },
      pass: {
        type: DataTypes.STRING(45),
        allowNull: false,
      },
      estado: {
        type: DataTypes.TINYINT,
        allowNull: false,
      },
      tipo: {
        type: DataTypes.TINYINT,
        allowNull: false,
        comment: "1- empleado 2-socio",
      },
      fk_personal: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "usuario_",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "id" }],
        },
      ],
    }
  );
};
