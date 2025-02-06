import { useState } from "react";
import {
  TextField,
  Button,
  Table,
  TableBody,
  Box,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";
import { apiUrl } from "../config";

function ListadoModelosPorTipo() {
  const [modelos, setModelos] = useState([]);
  const [tipo, setTipo] = useState("");

  async function buscarPorTipo() {
    if (!tipo.trim()) {
      alert("Por favor, ingresa un tipo válido.");
      return;
    }

    console.log(
      `📢 Enviando solicitud a: ${apiUrl}/modelos/buscar/tipo/${tipo}`
    );

    try {
      const response = await fetch(`${apiUrl}/modelos/buscar/tipo/${tipo}`);

      if (!response.ok) {
        console.warn("⚠️ No se encontraron modelos de este tipo.");
        setModelos([]);
        alert("No se encontraron modelos de este tipo.");
        return;
      }

      const data = await response.json();
      console.log("✅ Modelos encontrados:", data.datos);
      setModelos(data.datos);
    } catch (error) {
      console.error("❌ Error en la búsqueda:", error);
      alert("Hubo un error en la búsqueda.");
    }
  }

  return (
    <>
      <Typography variant="h4" align="center" sx={{ mt: 2 }}>
        Buscar Modelos por Tipo
      </Typography>

      <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
        <TextField
          label="Tipo de Modelo"
          variant="outlined"
          value={tipo}
          onChange={(e) => setTipo(e.target.value)}
          sx={{ m: 2 }}
        />
        <Button variant="contained" onClick={buscarPorTipo}>
          Buscar
        </Button>
      </Box>

      {modelos.length > 0 ? (
        <TableContainer component={Paper} sx={{ mt: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Nombre</TableCell>
                <TableCell>Tipo</TableCell>
                <TableCell>Precio</TableCell>
                <TableCell>Fecha de Lanzamiento</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {modelos.map((modelo) => (
                <TableRow key={modelo.id_modelo}>
                  <TableCell>{modelo.id_modelo}</TableCell>
                  <TableCell>{modelo.nombre}</TableCell>
                  <TableCell>{modelo.tipo}</TableCell>
                  <TableCell>{modelo.precio}</TableCell>
                  <TableCell>{modelo.fecha_lanzamiento}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography align="center" sx={{ mt: 2 }}>
          No hay modelos de este tipo.
        </Typography>
      )}
    </>
  );
}

export default ListadoModelosPorTipo;
