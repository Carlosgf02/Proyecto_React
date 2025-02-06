// Importar libreria para respuestas
const Respuesta = require("../utils/respuesta");
const { logMensaje } = require("../utils/logger.js");
// Recuperar función de inicialización de modelos
const initModels = require("../models/init-models.js").initModels;
// Crear la instancia de sequelize con la conexión a la base de datos
const sequelize = require("../config/sequelize.js");

// Cargar las definiciones del modelo en sequelize
const models = initModels(sequelize);
// Recuperar el modelo modelo
const Modelo = models.modelos;

const { Op } = require("sequelize");


class ModeloController {
  async createModelo(req, res) {
    // Implementa la lógica para crear una nueva modelo
    const modelo = req.body;

    try {
      const modeloNueva = await Modelo.create(modelo);

      res.status(201).json(Respuesta.exito(modeloNueva, "Modelo insertada"));
    } catch (err) {
      logMensaje("Error :" + err);
      res
        .status(500)
        .json(Respuesta.error(null, `Error al crear una modelo nueva: ${modelo}`));
    }
  }

  async getAllModelo(req, res) {
    try {
      const data = await Modelo.findAll(); // Recuperar todos los modelos
      res.json(Respuesta.exito(data, "Datos de modelos recuperados"));
    } catch (err) {
      // Handle errors during the model call
      res
        .status(500)
        .json(
          Respuesta.error(
            null,
            `Error al recuperar los datos de las modelos: ${req.originalUrl}`
          )
        );
    }
  }

  async deleteModelo(req, res) {
    const idmodelo = req.params.id_modelo;
    try {
      const numFilas = await Modelo.destroy({
        where: {
          id_modelo: idmodelo,
        },
      });
      if (numFilas == 0) {
        // No se ha encontrado lo que se quería borrar
        res
          .status(404)
          .json(Respuesta.error(null, "No encontrado: " + id_modelo));
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

  async getModeloById(req, res) {
    // El id modelo viene en la ruta /api/modelos/:id_modelo
    const id_modelo = req.params.id_modelo;
    try {
      const fila = await Modelo.findByPk(id_modelo);
      if (fila) {
        // Si se ha recuprado una modelo
        res.json(Respuesta.exito(fila, "Modelo recuperada"));
      } else {
        res.status(404).json(Respuesta.error(null, "Modelo no encontrada"));
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

  async buscarModelosPorTipo(req, res) {
    const { tipo } = req.params;
    console.log("📢 Buscando modelos del tipo: " + tipo);

    try {
      const modelos = await Modelo.findAll({
        where: {
          tipo: {
            [Op.like]: `%${tipo}%`  // ✅ Permite búsqueda parcial
          }
        }
      });

      if (modelos.length === 0) {
        console.warn("⚠️ No se encontraron modelos de este tipo.");
        return res.status(404).json({ mensaje: "No se encontraron modelos de este tipo" });
      }

      console.log("✅ Modelos encontrados:", modelos);
      res.json({ exito: true, datos: modelos });

    } catch (error) {
      console.error("❌ Error al buscar modelos por tipo:", error);
      res.status(500).json({ mensaje: "Error al buscar modelos por tipo", data: null });
    }
  }


  async updateModelo(req, res) {
    const modelo = req.body; // Recuperamos datos para actualizar
    const id_modelo = req.params.id_modelo; // dato de la ruta

    // Petición errónea, no coincide el id de la modelo de la ruta con el del objeto a actualizar
    if (id_modelo != modelo.id_modelo) {
      return res
        .status(400)
        .json(Respuesta.error(null, "El id de modelo no coincide"));
    }

    try {
      const numFilas = await Modelo.update({ ...modelo }, { where: { id_modelo } });

      if (numFilas == 0) {
        // No se ha encontrado lo que se quería actualizar o no hay nada que cambiar
        res
          .status(404)
          .json(Respuesta.error(null, "No encontrado o no modificado: " + id_modelo));
      } else {
        // Al dar status 204 no se devuelva nada
        // res.status(204).json(Respuesta.exito(null, "modelo actualizada"));
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

module.exports = new ModeloController();

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
