import React, { useContext } from 'react';
import './navbar.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../services/AuthContext';



const navLinks = [
    { path: "/employee", label: "Employee" },
    { path: "/product", label: "Product" },
    { path: "/sale", label: "Sale" },
    { path: "/saleDetail", label: "SaleDetail" },
    { path: "/supplier", label: "Supplier" }
  ];
  

  function Navbar() {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const handleLogout = () => {
        logout(); // Utiliza directamente logout del contexto
        navigate('/login'); // Opcional: redirige al usuario después de cerrar sesión
    };

    return (
        <nav>
            <div className="brand">
                <span>Trade Book</span>
            </div>
            <ul className="nav-links">
                {navLinks.map(link => (
                    <li key={link.path}>
                        <NavLink to={link.path} activeClassName="active">
                            {link.label}
                        </NavLink>
                    </li>
                ))}
            </ul>
            <div className="auth-links">
                {user ? (
                    <>
                        <span>Bienvenido: {user.FirstName}</span>
                        <button onClick={handleLogout} className="btn">Cerrar Sesión</button>
                    </>
                ) : (
                    <>
                        <NavLink to="/login" className="btn">Ingresar</NavLink>
                        <NavLink to="/register" className="btn">Registrarse</NavLink>
                    </>
                )}
            </div>
        </nav>
    );
}

export default Navbar;
