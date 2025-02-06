// Importar libreria para respuestas
const Respuesta = require("../utils/respuesta");
const { logMensaje } = require("../utils/logger.js");
// Recuperar función de inicialización de modelos
const initModels = require("../models/init-models.js").initModels;
// Crear la instancia de sequelize con la conexión a la base de datos
const sequelize = require("../config/sequelize.js");

// Cargar las definiciones del modelo en sequelize
const models = initModels(sequelize);
// Recuperar el modelo marca
const Marca = models.marcas;

const { Op } = require("sequelize");


class MarcaController {
  async createMarca(req, res) {
    // Implementa la lógica para crear una nueva marca
    const marca = req.body;
    console.log("Marca:",  req.body);
    try {
      const marcaNueva = await Marca.create(marca);

      res.status(201).json(Respuesta.exito(marcaNueva, "Marca insertada"));
    } catch (err) {
      logMensaje("Error :" + err);
      res
        .status(500)
        .json(Respuesta.error(null, `Error al crear una marca nueva: ${marca}`));
    }
  }

  async getAllMarca(req, res) {
    try {
      const data = await Marca.findAll(); // Recuperar todos los marcas
      res.json(Respuesta.exito(data, "Datos de marcas recuperados"));
    } catch (err) {
      // Handle errors during the model call
      res
        .status(500)
        .json(
          Respuesta.error(
            null,
            `Error al recuperar los datos de las marcas: ${req.originalUrl}`
          )
        );
    }
  }

  async deleteMarca(req, res) {
    const idmarca = req.params.id_marca;
    try {
      const numFilas = await Marca.destroy({
        where: {
          id_marca: idmarca,
        },
      });
      if (numFilas == 0) {
        // No se ha encontrado lo que se quería borrar
        res
          .status(404)
          .json(Respuesta.error(null, "No encontrado: " + id_marca));
      } else {
        res.status(204).send();
      }
    } catch (err) {
      logMensaje("Error :" + err);
      res
        .status(500)
        .json(
          Respuesta.error(
            null,
            `Error al eliminar los datos: ${req.originalUrl}`
          )
        );
    }
  }

  async getMarcaById(req, res) {
    // El id marca viene en la ruta /api/marcas/:id_marca
    const id_marca = req.params.id_marca;
    try {
      const fila = await Marca.findByPk(id_marca);
      if (fila) {
        // Si se ha recuprado una marca
        res.json(Respuesta.exito(fila, "Marca recuperada"));
      } else {
        res.status(404).json(Respuesta.error(null, "Marca no encontrada"));
      }
    } catch (err) {
      logMensaje("Error :" + err);
      res
        .status(500)
        .json(
          Respuesta.error(
            null,
            `Error al recuperar los datos: ${req.originalUrl}`
          )
        );
    }
  }

  async buscarMarcasPorPais(req, res) {
    const { pais } = req.params;
    console.log("📢 Buscando marcas del país: " + pais);

    try {
      const marcas = await Marca.findAll({
        where: {
          pais: {
            [Op.like]: `%${pais}%`  // ✅ Permite búsqueda parcial
          }
        }
      });

      if (marcas.length === 0) {
        console.warn("⚠️ No se encontraron marcas en este país.");
        return res.status(404).json({ mensaje: "No se encontraron marcas en este país" });
      }

      console.log("✅ Marcas encontradas:", marcas);
      res.json({ exito: true, datos: marcas });

    } catch (error) {
      console.error("❌ Error al buscar marcas por país:", error);
      res.status(500).json({ mensaje: "Error al buscar marcas por país", data: null });
    }
  }

  async updateMarca(req, res) {
    const marca = req.body; // Recuperamos datos para actualizar
    const id_marca = req.params.id_marca; // dato de la ruta

    // Petición errónea, no coincide el id de la marca de la ruta con el del objeto a actualizar
    if (id_marca != marca.id_marca) {
      return res
        .status(400)
        .json(Respuesta.error(null, "El id de marca no coincide"));
    }

    try {
      const numFilas = await Marca.update({ ...marca }, { where: { id_marca } });

      if (numFilas == 0) {
        // No se ha encontrado lo que se quería actualizar o no hay nada que cambiar
        res
          .status(404)
          .json(Respuesta.error(null, "No encontrado o no modificado: " + id_marca));
      } else {
        // Al dar status 204 no se devuelva nada
        // res.status(204).json(Respuesta.exito(null, "Marca actualizada"));
        res.status(204).send();
      }
    } catch (err) {
      logMensaje("Error :" + err);
      res
        .status(500)
        .json(
          Respuesta.error(
            null,
            `Error al actualizar los datos: ${req.originalUrl}`
          )
        );
    }
  }
}

module.exports = new MarcaController();

// Structure of result (MySQL)
// {
//   fieldCount: 0,
//   affectedRows: 1, // Number of rows affected by the query
//   insertId: 1,     // ID generated by the insertion operation
//   serverStatus: 2,
//   warningCount: 0,
//   message: '',
//   protocol41: true,
//   changedRows: 0   // Number of rows changed by the query
// }
