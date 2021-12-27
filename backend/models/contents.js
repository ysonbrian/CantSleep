const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "contents",
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      title: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      content: {
        type: DataTypes.STRING(3000),
        allowNull: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        field: "created_at",
      },
    },
    {
      sequelize,
      tableName: "contents",
      timestamps: true,
      updatedAt: false,
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
