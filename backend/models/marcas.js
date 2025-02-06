const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('marcas', {
    id_marca: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nombre: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    pais: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    fundacion: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    activo: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 1
    },
    logo: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    valor_mercado: {
      type: DataTypes.DECIMAL(15,2),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'marcas',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_marca" },
        ]
      },
    ]
  });
};
