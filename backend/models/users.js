const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "users",
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      userName: {
        type: DataTypes.STRING(255),
        allowNull: true,
        unique: "userName",
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      address: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      privateKey: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      mnemonicWord:{
        type: DataTypes.STRING(255),
        allowNull: true,
    },
      createdAt: {
        type: Sequelize.DATE,
        field: "created_at",
      },
    },
    {
      sequelize,
      tableName: "users",
      timestamps: true,
      updatedAt: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "id" }],
        },
        {
          name: "userName",
          unique: true,
          using: "BTREE",
          fields: [{ name: "userName" }],
        },
      ],
    }
  );
};
