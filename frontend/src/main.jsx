import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home"; // Asegúrate de que Home esté importado
import ListadoMarcas from "./components/ListadoMarcas"; // Los componentes secundarios
import ListadoModelos from "./components/ListadoModelos";
import AltaMarca from "./components/AltaMarca";
import AltaModelo from "./components/AltaModelo";
import ModificarMarca from "./components/ModificarMarca";
import ModificarModelo from "./components/ModificarModelo";
import ErrorPage from "./pages/ErrorPage";
import "mdb-react-ui-kit/dist/css/mdb.min.css"; // Asegúrate de que esta línea esté presente
import ListadoModelosPorTipo from "./components/ListadoModeloPorTipo";
import ListadoMarcaPorPais from "./components/ListadoMarcaPorPais";

// Configuración de las rutas
let router = createBrowserRouter([
  {
    path: "/",
    element: <Home />, // Usamos Principal que incluye el Menu
    errorElement: <ErrorPage />,
    children: [
      {
        path: "listadomarcas",
        element: <ListadoMarcas />,
      },
      {
        path: "listadomodelos",
        element: <ListadoModelos />,
      },
      {
        path: "altamarca",
        element: <AltaMarca />,
      },
      {
        path: "altamodelo",
        element: <AltaModelo />,
      },
      {
        path: "modificarmarca/:id_marca",
        element: <ModificarMarca />,
      },
      {
        path: "modificarmodelo/:id_modelo",
        element: <ModificarModelo />,
      },
      { path: "listadomodeloportipo", element: <ListadoModelosPorTipo /> },
      { path: "listadomarcaporpais", element: <ListadoMarcaPorPais /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
