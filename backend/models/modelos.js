const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('modelos', {
    id_modelo: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nombre: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    tipo: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    precio: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    fecha_lanzamiento: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    disponible: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 1
    },
    potencia_hp: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    consumo_litros: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    id_marca: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'marcas',
        key: 'id_marca'
      }
    }
  }, {
    sequelize,
    tableName: 'modelos',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_modelo" },
        ]
      },
      {
        name: "id_marca",
        using: "BTREE",
        fields: [
          { name: "id_marca" },
        ]
      },
    ]
  });
};
