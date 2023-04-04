import { Link } from 'react-router-dom';
import '../styles/Footer.css';
import logo from '../img/logoinvertido.png';

export const Footer = () => {
    return (
        <footer className='ContainerFooter'>
            <p className='Computer'>elgatonegropremium</p>
            <div className='ContainerLogo'>
                <div className='Logo'>                    
                    <img width="60px" src={logo} alt="" />
                    {/* logos */}
                </div>
               
            </div>
        </footer>
    
    )
}