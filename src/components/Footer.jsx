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
            <div className='footer-links'>
                <Link to="/politica-privacidad" className="footer-link">Política de Privacidad</Link>
                <p>{" "}</p>
                <Link to="/condiciones-servicio" className="footer-link">Condiciones del Servicio</Link>
            </div>
        </footer>
    );
};

// import { Link } from 'react-router-dom';
// import '../styles/Footer.css';
// import logo from '../img/logoinvertido.png';

// export const Footer = () => {
//     return (
//         <footer className='container-footer'>
//             <p className='footer-text'>elgatonegropremium</p>
//             <div className='logo-container'>
//                 <img className='logo' src={logo} alt="Logo El Gato Negro Premium" />
//             </div>
//         </footer>
//     );
// };
