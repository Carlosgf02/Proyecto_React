import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Typography, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Button from "@mui/material/Button";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { useNavigate } from "react-router";
import { apiUrl } from "../config";

function ListadoModelos() {
  const [rows, setRows] = useState([]);
  const [searchId, setSearchId] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function getModelos() {
      let response = await fetch(apiUrl + "/modelos", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        let data = await response.json();
        setRows(data.datos);
      }
    }

    getModelos();
  }, []); // Se ejecuta solo en el primer renderizado

  const handleDelete = async (id_modelo) => {
    let response = await fetch(apiUrl + "/modelos/" + id_modelo, {
      method: "DELETE",
    });

    if (response.ok) {
      // Utilizando filter creo un array sin el modelo borrado
      const modelosTrasBorrado = rows.filter(
        (modelo) => modelo.id_modelo != id_modelo
      );
      // Establece los datos de nuevo para provocar un renderizado
      setRows(modelosTrasBorrado);
    }
  };

  const handleSearchById = async () => {
    if (!searchId) {
      alert("Por favor, ingresa un ID válido.");
      return;
    }

    let response = await fetch(apiUrl + "/modelos/" + searchId, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      let data = await response.json();
      setRows([data.datos]);
    } else {
      alert("Modelo no encontrad.");
    }
  };

  return (
    <>
      <Typography variant="h4" align="center" sx={{ mt: 2 }}>
        Listado de modelos
      </Typography>

      <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
        <TextField
          label="Buscar por ID"
          variant="outlined"
          size="small"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
          sx={{ mr: 2 }}
        />
        <Button variant="contained" onClick={handleSearchById}>
          Buscar
        </Button>
      </Box>

      <Box sx={{ mx: 4 }}>
        <TableContainer component={Paper} sx={{ mt: 2 }}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="right">ID_MODELO</TableCell>
                <TableCell>NOMBRE</TableCell>
                <TableCell>TIPO</TableCell>
                <TableCell align="right">PRECIO</TableCell>
                <TableCell align="right">FECHA LANZAMIENTO</TableCell>
                <TableCell align="right">DISPONIBLE</TableCell>
                <TableCell align="right">POTENCIA HP</TableCell>
                <TableCell align="right">CONSUMO LITROS</TableCell>
                <TableCell align="right">ID MARCA</TableCell>
                <TableCell align="center">ELIMINAR</TableCell>
                <TableCell align="center">EDITAR</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.id_modelo}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="right">{row.id_modelo}</TableCell>
                  <TableCell align="right">{row.nombre}</TableCell>
                  <TableCell>{row.tipo}</TableCell>
                  <TableCell align="right">{row.precio + " €"}</TableCell>
                  <TableCell align="right">{row.fecha_lanzamiento}</TableCell>
                  <TableCell align="right">
                    {row.disponible ? "SI" : "NO"}
                  </TableCell>
                  <TableCell align="right">{row.potencia_hp} HP</TableCell>
                  <TableCell align="right">{row.consumo_litros} L</TableCell>
                  <TableCell align="right">{row.id_marca}</TableCell>
                  <TableCell align="center">
                    <Button
                      variant="contained"
                      onClick={() => handleDelete(row.id_modelo)}
                      color="error"
                    >
                      <DeleteForeverIcon fontSize="small" />
                    </Button>
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      variant="contained"
                      onClick={() =>
                        navigate("/modificarModelo/" + row.id_modelo)
                      }
                    >
                      <EditNoteIcon fontSize="small" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
}

export default ListadoModelos;
