const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "metadata",
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      description: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      imgURI: {
        type: DataTypes.STRING(3000),
        allowNull: true,
      },
      tokenURI: {
        type: DataTypes.STRING(3000),
        allowNull: true,
      },
      tokenId: {
        type: DataTypes.STRING(3000),
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "metadata",
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
