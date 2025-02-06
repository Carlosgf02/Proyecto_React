// Importar libreria para manejo de ficheros de configuración
require("dotenv").config();
// Importar fichero de configuración con variables de entorno
const config = require("./config/config");
// Importar librería express --> web server
const express = require("express");
// Importar librería path, para manejar rutas de ficheros en el servidor
const path = require("path");
// Importar libreria CORS
const cors = require("cors");

// Importar gestores de rutas
const marcaRoutes = require("./routes/marcaRoutes");
const modeloRoutes = require("./routes/modeloRoutes");

const app = express();

// Configurar middleware para analizar JSON en las solicitudes
app.use(express.json());


// Configurar CORS para admitir el origen del frontend en desarrollo
app.use(
  cors({
    origin: "http://localhost:5173", // Permitir el frontend en desarrollo
  })
);


// Configurar rutas de la API Rest
app.use("/api/marcas", marcaRoutes);
app.use("/api/modelos", modeloRoutes);

//Ruta para manejar las solicitudes al archivo index.html
// app.get('/', (req, res) => {
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Iniciar el servidor
app.listen(config.port, () => {
  console.log(`Servidor escuchando en el puerto ${config.port}`);
});
