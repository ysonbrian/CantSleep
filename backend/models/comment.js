module.exports = (sequelize, DataTypes)=>{
    return sequelize.define('comment', {
      comment: {
          type: DataTypes.STRING(100),
          allowNull: false,
        },
      created_at: {
          type: DataTypes.DATE,
          allowNull: true,
          defaultValue: DataTypes.NOW,
        },
    }, {
        timestamps: false,
    });
    
    // commenter 컬럼은 일단 생략되어 있음... 추후에 설명
  };