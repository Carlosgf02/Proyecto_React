import { Typography, TextField, Stack, Button } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { apiUrl } from "../config";

function ModificarMarca() {
  const params = useParams();
  const [datos, setDatos] = useState({
    id_marca: params.id_marca,
    nombre: "",
    pais: "",
    fundacion: "",
    activo: true,
    logo: "",
    valorMercado: "",
  });
  const [validacion, setValidacion] = useState({
    nombre: false,
    pais: false,
    fundacion: false,
    logo: false,
    valorMercado: false,
  });

  const navigate = useNavigate();

  useEffect(() => {
    async function getMarcaById() {
      let response = await fetch(apiUrl + "/marcas/" + datos.id_marca);
      if (response.ok) {
        let data = await response.json();
        setDatos(data.datos);
      } else if (response.status === 404) {
        let data = await response.json();
        alert(data.mensaje);
        navigate("/"); // Volver a la página principal por ruta erronea
      }
    }

    getMarcaById();
  }, []); // Se ejecuta solo en el primer renderizado

  const handleSubmit = async (e) => {
    // No hacemos submit
    e.preventDefault();
    console.log("Vamos a validar");
    if (validarDatos()) {
      // Enviamos los datos mediante fetch
      try {
        console.log("Vamos a hacer fetch");
        const response = await fetch(apiUrl + "/marcas/" + datos.id_marca, {
          method: "PUT", // "PATCH"
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(datos), // JSON.stringify({blocked: true})
        });

        if (response.ok) {
          // 204 No content
          alert("Actualización correcta");
          navigate(-1); // Volver a la ruta anterior
        } else {
          // 404 Not Found marca no modificado o no encontrado
          const data = await response.json();
          alert(data.mensaje);
        }
      } catch (error) {
        console.error("Error:", error);
        alert("Error:", error);
      }
    }
  };

  function validarDatos() {
    // En principio, damos por bueno el formulario
    let validado = true;
    // Estado de la validación auxiliar
    let validacionAux = {
      nombre: false,
      pais: false,
      logo: false,
      valorMercado: false,
    };

    if (datos.nombre.length < 1) {
      // Error en el nombre
      validacionAux.nombre = true;
      // Formulario invalido
      validado = false;
    }

    if (datos.pais.length < 1) {
      // Error en el pais
      validacionAux.pais = true;
      // Formulario invalido
      validado = false;
    }

    if (datos.logo.length < 1) {
      // Error en el logo
      validacionAux.logo = true;
      // Formulario invalido
      validado = false;
    }

    if (datos.valor_mercado < 1)  {
      // El valor de mercado es mayor de 1
      validacionAux.valorMercado = true;
      // Formulario invalido
      validado = false;
    }


    // Actualizo el estado de la validacion de los Textfields
    setValidacion(validacionAux);
    console.log("Formulario valido:", validado);
    return validado;
  }
  const handleChange = (e) => {
    setDatos({
      ...datos,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <Typography variant="h4" align="center" sx={{ mt: 2 }}>
        Modificar marca
      </Typography>
      <Grid
        container
        spacing={2}
        sx={{ mt: 2, justifyContent: "center", alignItems: "center" }}
      >
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Stack
            component="form"
            spacing={2}
            onSubmit={handleSubmit}
            sx={{ mx: 2 }}
          >
            <TextField
              id="outlined-basic"
              label="Nombre"
              variant="outlined"
              name="nombre"
              value={datos.nombre}
              onChange={handleChange}
              error={validacion.nombre}
              helperText={
                validacion.nombre && "Nombre incorrecto. Mínimo 3 caracteres"
              }
            />
            <TextField
              id="outlined-basic"
              label="País"
              variant="outlined"
              name="pais"
              value={datos.pais}
              onChange={handleChange}
              error={validacion.pais}
              helperText={
                validacion.pais && "País incorrecto. Mínimo 3 caracteres"
              }
            />
            <TextField
              id="outlined-basic"
              label="Logo"
              variant="outlined"
              name="logo"
              value={datos.logo}
              onChange={handleChange}
              error={validacion.logo}
              helperText={
                validacion.logo && "URL del logo incorrecto. Inicia con http://"
              }
            />
            <TextField
              id="outlined-basic"
              label="Valor en mercado"
              variant="outlined"
              name="valor_mercado"
              value={datos.valor_mercado}
              onChange={handleChange}
              error={validacion.precio}
              helperText={
                validacion.precio &&
                "Valor en mercado incorrecto. Debe ser un número positivo"
              }
            />

            <Button variant="contained" type="submit">
              Aceptar
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </>
  );
}

export default ModificarMarca;
