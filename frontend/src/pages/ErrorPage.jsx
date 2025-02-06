import React from "react";
import { Container, Typography } from "@mui/material";

function ErrorPage() {
  return (
    <Container sx={{ mt: 5, textAlign: "center" }}>
      <Typography variant="h3" color="error">
        404 - Página No Encontrada
      </Typography>
      <Typography variant="h5">
        Lo sentimos, la página que buscas no existe.
      </Typography>
    </Container>
  );
}

export default ErrorPage;
