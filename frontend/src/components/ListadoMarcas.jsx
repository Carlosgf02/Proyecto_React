import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Typography,TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Button from "@mui/material/Button";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { useNavigate } from "react-router";
import { apiUrl } from "../config";

function ListadoMarcas() {
  const [rows, setRows] = useState([]);
  const [searchId, setSearchId] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function getMarcas() {
      let response = await fetch(apiUrl + "/marcas", {
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

    getMarcas();
  }, []); // Se ejecuta solo en el primer renderizado

  const handleDelete = async (id_marca) => {
    let response = await fetch(apiUrl + "/marcas/" + id_marca, {
      method: "DELETE",
    });

    if (response.ok) {
      // Utilizando filter creo un array sin el marca borrado
      const marcasTrasBorrado = rows.filter(
        (marca) => marca.id_marca != id_marca
      );
      // Establece los datos de nuevo para provocar un renderizado
      setRows(marcasTrasBorrado);
    }
  };

  const handleSearchById = async () => {
    if (!searchId) {
      alert("Por favor, ingresa un ID válido.");
      return;
    }

    let response = await fetch(apiUrl + "/marcas/" + searchId, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      let data = await response.json();
      setRows([data.datos]);
    } else {
      alert("Marca no encontrada.");
    }
  };

  return (
    <>
      <Typography variant="h4" align="center" sx={{ mt: 2 }}>
        Listado de marcas
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
                <TableCell align="right">ID_MARCA</TableCell>
                <TableCell>NOMBRE</TableCell>
                <TableCell>PAIS</TableCell>
                <TableCell align="right">FUNDACION</TableCell>
                <TableCell align="right">ACTIVO</TableCell>
                <TableCell align="right">LOGO</TableCell>
                <TableCell align="right">VALOR_MERCADO</TableCell>
                <TableCell align="center">ELIMINAR</TableCell>
                <TableCell align="center">EDITAR</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.id_marca}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="right">{row.id_marca}</TableCell>
                  <TableCell align="right">{row.nombre}</TableCell>
                  <TableCell align="right">{row.pais}</TableCell>
                  <TableCell align="right">{row.fundacion}</TableCell>
                  <TableCell align="right">{row.activo? "SI" : "NO"}</TableCell>
                  <TableCell align="right">{row.logo}</TableCell>
                  <TableCell align="right">{row.valor_mercado + " €"}</TableCell>
                  <TableCell align="center">
                    <Button
                      variant="contained"
                      onClick={() => handleDelete(row.id_marca)}
                      color="error"
                    >
                      <DeleteForeverIcon fontSize="small" />
                    </Button>
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      variant="contained"
                      onClick={() => navigate("/modificarMarca/" + row.id_marca)}
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

export default ListadoMarcas;
