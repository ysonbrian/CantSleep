
'use strict';
module.exports = (sequelize, DataTypes) =>{
  return sequelize.define('user',{
     userName:{
          type: DataTypes.STRING(255),
          allowNull: true,
          unique: true,
     },
     password:{
         type: DataTypes.STRING(255),
         allowNull: true,
     },
     created_at:{
         type: DataTypes.DATE,
         allowNull: true,
         defaultValue: DataTypes.NOW,
     },
     address:{
      type: DataTypes.STRING(255),
      allowNull: true,
  },
  privateKey:{
      type: DataTypes.STRING(255),
      allowNull: true,
  },
  mnemonicWord:{
    type: DataTypes.STRING(255),
    allowNull: true,
},
  },{
      timestamps: false,
    }
  );
};
