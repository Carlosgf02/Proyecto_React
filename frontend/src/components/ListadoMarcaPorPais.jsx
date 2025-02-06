import { useState } from "react";
import { TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from "@mui/material";
import { apiUrl } from "../config";

function ListadoMarcasPorPais() {
  const [marcas, setMarcas] = useState([]);
  const [pais, setPais] = useState("");

  async function buscarPorPais() {
    if (!pais.trim()) {
      alert("Por favor, ingresa un país válido.");
      return;
    }

    console.log(`📢 Enviando solicitud a: ${apiUrl}/marcas/buscar/pais/${pais}`);

    try {
      const response = await fetch(`${apiUrl}/marcas/buscar/pais/${pais}`);

      if (!response.ok) {
        console.warn("⚠️ No se encontraron marcas en este país.");
        setMarcas([]);
        alert("No se encontraron marcas en este país.");
        return;
      }

      const data = await response.json();
      console.log("✅ Marcas encontradas:", data.datos);
      setMarcas(data.datos);

    } catch (error) {
      console.error("❌ Error en la búsqueda:", error);
      alert("Hubo un error en la búsqueda.");
    }
  }

  return (
    <>
      <Typography variant="h4" align="center" sx={{ mt: 2 }}>
        Buscar Marcas por País
      </Typography>

      <TextField
        label="País"
        variant="outlined"
        value={pais}
        onChange={(e) => setPais(e.target.value)}
        sx={{ m: 2 }}
      />
      <Button variant="contained" onClick={buscarPorPais}>Buscar</Button>

      {marcas.length > 0 ? (
        <TableContainer component={Paper} sx={{ mt: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Nombre</TableCell>
                <TableCell>País</TableCell>
                <TableCell>Fundación</TableCell>
                <TableCell>Activo</TableCell>
                <TableCell>Valor de Mercado</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {marcas.map((marca) => (
                <TableRow key={marca.id_marca}>
                  <TableCell>{marca.id_marca}</TableCell>
                  <TableCell>{marca.nombre}</TableCell>
                  <TableCell>{marca.pais}</TableCell>
                  <TableCell>{marca.fundacion}</TableCell>
                  <TableCell>{marca.activo ? "✅ SI" : "❌ NO"}</TableCell>
                  <TableCell>{marca.valor_mercado + " €"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography align="center" sx={{ mt: 2 }}>
          No hay marcas en este país.
        </Typography>
      )}
    </>
  );
}

export default ListadoMarcasPorPais;
