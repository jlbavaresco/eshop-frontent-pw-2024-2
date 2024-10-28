import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink, Outlet } from 'react-router-dom';

function Menu() {
    return (
        <>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container>                    
                    <NavLink className="navbar-brand" exact="true"
                                to="/">eShop - PW-2024-2</NavLink> 
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">                            
                            <NavLink className="nav-link active" exact="true"
                                to="/">Home</NavLink>                            
                            <NavDropdown title="Manutenções" id="basic-nav-dropdown">
                                <NavLink className="dropdown-item" exact="true"
                                    to="/categorias">Categorias</NavLink>
                                <NavLink className="dropdown-item" exact="true"
                                    to="/produtos">Produtos</NavLink>
                            </NavDropdown>
                            <NavLink className="nav-link active" exact="true"
                                to="/sobre">Sobre...</NavLink>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Outlet />
        </>
    );
}

export default Menu;