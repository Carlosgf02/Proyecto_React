import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useNavigate } from "react-router-dom";
import { apiUrl } from "../config";

function AltaModelo() {
  const [datos, setDatos] = useState({
    nombre: "",
    tipo: "",
    precio: "",
    fecha_lanzamiento: "",
    disponible: true,
    potencia_hp: "",
    consumo_litros: "",
    id_marca: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    // No hacemos submit
    e.preventDefault();

    // Enviamos los datos mediante fetch
    try {
      const response = await fetch(apiUrl + "/modelos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(datos),
      });

      if (response.ok) {
        const respuesta = await response.json();
        alert(respuesta.mensaje);
        if (respuesta.ok) {
          navigate("/"); // Volver a la página principal
        }
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error:", error);
    }
  };

  const handleChange = (e) => {
    setDatos({
      ...datos,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3, p: 5 }}>
        <Typography variant="h4" gutterBottom>
          Alta de Modelo
        </Typography>
        <Grid container spacing={2} direction="column">
          {" "}
          {/* Asegura que los elementos sean verticales */}
          <Grid xs={12}>
            <TextField
              fullWidth
              label="Nombre"
              value={datos.nombre}
              name="nombre"
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid xs={12}>
            <TextField
              fullWidth
              label="Tipo"
              value={datos.tipo}
              name="tipo"
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid xs={12}>
            <TextField
              fullWidth
              label="Precio (euros)"
              type="number"
              value={datos.precio}
              name="precio"
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid xs={12}>
            <TextField
              fullWidth
              label="Fecha de Lanzamiento"
              type="date"
              value={datos.fecha_lanzamiento}
              name="fecha_lanzamiento"
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid xs={12}>
            <TextField
              fullWidth
              label="Potencia de Motor (CV)"
              type="number"
              value={datos.potencia_hp}
              name="potencia_hp"
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid xs={12}>
            <TextField
              fullWidth
              label="Consumo de Combustible (L/100km)"
              type="number"
              value={datos.consumo_litros}
              name="consumo_litros"
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid xs={12}>
            <TextField
              fullWidth
              label="Marca"
              value={datos.id_marca}
              name="id_marca"
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={datos.disponible}
                  onChange={(e) =>
                    setDatos({ ...datos, disponible: e.target.checked })
                  }
                  name="disponible"
                />
              }
              label="Disponible"
            />
          </Grid>
          <Grid xs={12} display="flex" justifyContent="flex-end">
            <Button type="submit" variant="contained">
              Registrar
            </Button>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default AltaModelo;
