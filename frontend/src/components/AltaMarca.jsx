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
import { apiUrl } from '../config';


function AltaMarca() {

  const [datos, setDatos] = useState({
    nombre: "",
    pais: "",
    fundacion: "",
    activo: true,
    logo: "",
    valorMercado: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    // No hacemos submit
    e.preventDefault();

    // Enviamos los datos mediante fetch
    try{
        const response = await fetch(apiUrl + "/marcas", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(datos),
          });

        if (response.ok) {
            const respuesta = await response.json();
            alert(respuesta.mensaje);
            if(respuesta.ok){
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
        Alta de Marca
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
            label="País"
            value={datos.pais}
            name="pais"
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid xs={12}>
          <TextField
            fullWidth
            label="Año de Fundación"
            type="number"
            value={datos.fundacion}
            onChange={handleChange}
            name="fundacion"
            required
          />
        </Grid>
        <Grid xs={12}>
          <TextField
            fullWidth
            label="URL del Logo"
            value={datos.logo}
            name="logo"
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid xs={12}>
          <TextField
            fullWidth
            label="Valor de Mercado (millones)"
            type="number"
            value={datos.valorMercado}
            name="valorMercado"
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid xs={12}>
          <FormControlLabel
            control={
              <Checkbox
                checked={datos.activo}
                name="activo"
                value={datos.activo}
                onChange={handleChange}
              />
            }
            label="Activo"
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

export default AltaMarca;
