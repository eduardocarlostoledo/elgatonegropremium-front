import { Link } from 'react-router-dom';
import '../styles/Footer.css';
import logo from '../img/logoinvertido.png';

export const Footer = () => {
    return (
        <footer className='container-footer'>
            <p className='footer-text'>elgatonegropremium</p>
            <div className='logo-container'>
                <img className='logo' src={logo} alt="Logo El Gato Negro Premium" />
            </div>
        </footer>
    );
};
