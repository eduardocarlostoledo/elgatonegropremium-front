import { Link } from 'react-router-dom';
import '../styles/Footer.css';
import logo from '../img/logoinvertido.png';

export const Footer = () => {
  return (
    <footer className='footer'>
      <div className='footer-top'>
        <div className='footer-logo'>
          <img src={logo} alt="Logo El Gato Negro Premium" />
        </div>
        <div className='footer-links'>
          <Link to="/politica-privacidad">Política de Privacidad</Link>
          <Link to="/condiciones-servicio">Condiciones del Servicio</Link>
          <Link to="/terminos">Términos y Condiciones</Link>
          <Link to="/ayuda">Ayuda</Link>
          <Link to="/contacto">Contacto</Link>
        </div>
      </div>

      <div className='footer-bottom'>
        <p>&copy; {new Date().getFullYear()} El Gato Negro Premium. Todos los derechos reservados.</p>
        <p>Hecho con ❤️ en Misiones, Argentina</p>
      </div>
    </footer>
  );
};
