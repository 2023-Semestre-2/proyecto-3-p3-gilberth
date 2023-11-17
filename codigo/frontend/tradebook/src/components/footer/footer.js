import React from "react";
import "./footer.css"; // Asegúrate de que la ruta sea correcta

const Footer = () => {
  return (
    <footer className="footer">
      <h3>Grocery Store "El Buen Sabor"</h3>
      <p>Everything you need, within your reach.</p>
      <div>
        <p>Contact:</p>
        <p><strong>Phone:</strong> +1 234 567 890</p>
        <p><strong>Email:</strong> <a href="mailto:contacto@elbuensabor.com">contacto@elbuensabor.com</a></p>
        <p><strong>Address:</strong> 123 Fictional Street, Imaginary City</p>
      </div>
      <div>
        <p>&copy; {new Date().getFullYear()} Grocery Store "El Buen Sabor"</p>
      </div>
    </footer>
  );
};


export default Footer;
