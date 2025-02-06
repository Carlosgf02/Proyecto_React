import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBCollapse,
} from "mdb-react-ui-kit";
import { useState } from "react";
import { Link } from "react-router-dom"; // Cambié para usar <Link> correctamente


function Principal() {
  const [openBasic, setOpenBasic] = useState(false);

  return (
    <MDBNavbar expand="lg" light bgColor="light">
      <MDBContainer fluid>
        <MDBNavbarBrand href="/">Marcas y Modelos</MDBNavbarBrand>

        <MDBNavbarToggler
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={() => setOpenBasic(!openBasic)}
        >
          <MDBIcon icon="bars" fas />
        </MDBNavbarToggler>

        <MDBCollapse navbar open={openBasic}>
          <MDBNavbarNav className="w-100 d-flex justify-content-end align-items-center">
            {/* Menú de Marcas */}
            <MDBNavbarItem>
              <MDBDropdown>
                <MDBDropdownToggle tag="a" className="nav-link" role="button">
                  Marcas
                </MDBDropdownToggle>
                <MDBDropdownMenu>
                  <Link to="/altamarca">
                    <MDBDropdownItem link>Alta de Marca</MDBDropdownItem>
                  </Link>
                  <Link to="/listadomarcas">
                    <MDBDropdownItem link>Listado de Marcas</MDBDropdownItem>
                  </Link>
                  <Link to="/ListadoMarcaPorPais">
                    <MDBDropdownItem link>Listado de Marcas por País</MDBDropdownItem>
                  </Link>
                </MDBDropdownMenu>
              </MDBDropdown>
            </MDBNavbarItem>

            {/* Menú de Modelos */}
            <MDBNavbarItem>
              <MDBDropdown>
                <MDBDropdownToggle tag="a" className="nav-link" role="button">
                  Modelos
                </MDBDropdownToggle>
                <MDBDropdownMenu>
                  <Link to="/altamodelo">
                    <MDBDropdownItem link>Alta de Modelo</MDBDropdownItem>
                  </Link>
                  <Link to="/listadomodelos">
                    <MDBDropdownItem link>Listado de Modelos</MDBDropdownItem>
                  </Link>
                  <Link to="/ListadoModeloPorTipo">
                    <MDBDropdownItem link>Listado de Modelos por Tipo</MDBDropdownItem>
                  </Link>
                </MDBDropdownMenu>
              </MDBDropdown>
            </MDBNavbarItem>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
}

export default Principal;
