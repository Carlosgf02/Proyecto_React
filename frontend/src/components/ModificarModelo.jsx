import { Typography, TextField, Stack, Button } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { apiUrl } from "../config";

function ModificarModelo() {
  const params = useParams();
  const [datos, setDatos] = useState({
    id_modelo: params.id_modelo,
    nombre: "",
    tipo: "",
    precio: "",
    fecha_lanzamiento: "",
    disponible: true,
    potencia_hp: "",
    consumo_litros: "",
    id_marca: "",
  });
  const [validacion, setValidacion] = useState({
    nombre: false,
    tipo: false,
    precio: false,
    potencia_hp: false,
    consumo_litros: false,
  });

  const navigate = useNavigate();

  useEffect(() => {
    async function getModeloById() {
      let response = await fetch(apiUrl + "/modelos/" + datos.id_modelo);
      if (response.ok) {
        let data = await response.json();
        setDatos(data.datos);
      } else if (response.status === 404) {
        let data = await response.json();
        alert(data.mensaje);
        navigate("/"); // Volver a la página principal por ruta erronea
      }
    }

    getModeloById();
  }, []); // Se ejecuta solo en el primer renderizado

  const handleSubmit = async (e) => {
    // No hacemos submit
    e.preventDefault();
    console.log("Vamos a validar");
    if (validarDatos()) {
      // Enviamos los datos mediante fetch
      try {
        console.log("Vamos a hacer fetch");
        const response = await fetch(apiUrl + "/modelos/" + datos.id_modelo, {
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
          // 404 Not Found modelo no modificado o no encontrado
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
      tipo: false,
      precio: false,
      potencia_hp: false,
      consumo_litros: false,
    };

    if (datos.nombre.length < 1) {
      // Error en el nombre
      validacionAux.nombre = true;
      // Formulario invalido
      validado = false;
    }
    if (datos.tipo.length < 1) {
      // Error en el pais
      validacionAux.tipo = true;
      // Formulario invalido
      validado = false;
    }
    if (datos.precio < 1) {
      // El valor de mercado es mayor de 1
      validacionAux.precio = true;
      // Formulario invalido
      validado = false;
    }
    if (datos.potencia_hp < 1) {
      // El valor de mercado es mayor de 1
      validacionAux.potencia_hp = true;
      // Formulario invalido
      validado = false;
    }
    if (datos.consumo_litros < 1) {
      // El valor de mercado es mayor de 1
      validacionAux.consumo_litros = true;
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
        Modificar modelo
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
              label="Tipo"
              variant="outlined"
              name="tipo"
              value={datos.tipo}
              onChange={handleChange}
              error={validacion.tipo}
              helperText={
                validacion.tipo && "Tipo incorrecto. Mínimo 3 caracteres"
              }
            />
            <TextField
              id="outlined-basic"
              label="Precio"
              variant="outlined"
              type="number"
              name="precio"
              value={datos.precio}
              onChange={handleChange}
              error={validacion.precio}
              helperText={
                validacion.precio && "Precio incorrecto. Mínimo 1 caracter"
              }
            />
            <TextField
              id="outlined-basic"
              label="Potencia HP"
              variant="outlined"
              type="number"
              name="potencia_hp"
              value={datos.potencia_hp}
              onChange={handleChange}
              error={validacion.potencia_hp}
              helperText={
                validacion.potencia_hp &&
                "Potencia incorrecta. Mínimo 1 caracter"
              }
            />
            <TextField
              id="outlined-basic"
              label="Consumo Litros"
              variant="outlined"
              type="number"
              name="consumo_litros"
              value={datos.consumo_litros}
              onChange={handleChange}
              error={validacion.consumo_litros}
              helperText={
                validacion.consumo_litros &&
                "Consumo incorrecto. Mínimo 1 caracter"
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

export default ModificarModelo;
