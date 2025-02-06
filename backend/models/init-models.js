var DataTypes = require("sequelize").DataTypes;
var _marcas = require("./marcas");
var _modelos = require("./modelos");

function initModels(sequelize) {
  var marcas = _marcas(sequelize, DataTypes);
  var modelos = _modelos(sequelize, DataTypes);

  modelos.belongsTo(marcas, { as: "id_marca_marca", foreignKey: "id_marca"});
  marcas.hasMany(modelos, { as: "modelos", foreignKey: "id_marca"});

  return {
    marcas,
    modelos,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
