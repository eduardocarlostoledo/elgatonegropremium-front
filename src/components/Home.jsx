import React from "react";
import "../styles/Home.css";
import gato from "../images/imagen_home.jpeg";
import carlos from "../images/carlos.jpg";
import ana from "../images/ana.jpg";
import raul from "../images/raul.jpg";
import sergio from "../images/sergio.jpg";
import mariana from "../images/mariana.jpg";
import javier from "../images/javier.jpg";
import cushman from "../images/cushman.jpg"
import heisenberg from "../images/heisenberg.jpg"
import gatogafas from "../images/gato.jpg"
import { FaHandsHelping, FaShoppingBag, FaLeaf } from "react-icons/fa";

export const Home = () => {
  const handleClick = () => {
    window.location.href = "https://wa.me/5493764331313";
  };

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-text">
          <h1>El Gato Negro Premium</h1>
        </div>
      </section>

      {/* About Section */}
      <section className="about-section">
        
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2>¿Por qué elegirnos?</h2>
        <div className="features-grid">
          <div className="feature">
          <h2>Innovación y Compromiso con Tu Salud</h2>
            <p>
              E-liquids cuidadosamente elaborados con los mejores ingredientes para brindarte la máxima satisfacción. Usando aromas de calidad de los mejores alquimistas de Argentina y de USA.
            </p>
            <div className="about-content">
          
          
        </div>

          </div>
          <div className="feature">
            <img src={gato} alt="El Gato Negro" className="hero-image" />
          </div>
          <div className="feature">
            <h2>
              Porque tu salud es nuestra prioridad.
            </h2>

            <p>
            Nos comprometemos con la calidad y la seguridad en todos nuestros productos. Nos especializamos en ofrecer productos de vaporización de alta calidad. Cada uno de nuestros e-liquids es formulado con ingredientes premium, para que disfrutes de una experiencia única sin comprometer tu bienestar.
          </p>

          </div>
        </div>
      </section>

      {/* Nuestro Compromiso */}
      <section className="features-section">
        <h3>Compromisos que nos definen</h3>
        <div className="features-grid">
          <div className="feature">
            <FaHandsHelping className="feature-icon" />
            <h4>Compromiso con la Comunidad</h4>
            <p>
              Parte de nuestras ganancias se destinan a apoyar a organizaciones y comedores populares, fomentando el bienestar de quienes más lo necesitan.
            </p>
          </div>
          <div className="feature">
            <FaShoppingBag className="feature-icon" />
            <h4>Apoyo a la Economía Local</h4>
            <p>
              Nuestros productos son elaborados localmente, ayudando a fortalecer la economía y creando empleo en nuestra comunidad.
            </p>
          </div>
          <div className="feature">
            <FaLeaf className="feature-icon" />
            <h4>Cuidado Ambiental</h4>
            <p>
              Promovemos el uso de envases reciclables y reparables, contribuyendo al cuidado del medio ambiente. Nuestros productos están diseñados para ser sostenibles.
            </p>
          </div>
        </div>
      </section>
{/* galeria */}
      {/* <section className="features-section">
        <h3>Compromisos que nos definen</h3>
        <div className="features-grid">
        
        <div className="feature">
            <img src={heisenberg} alt="El Gato Negro" className="hero-image" />
          </div>

          <div className="feature">
            <img src={gatogafas} alt="El Gato Negro" className="hero-image" />
          </div>

          <div className="feature">
            <img src={cushman} alt="El Gato Negro" className="hero-image" />
          </div>

        </div>
      </section> */}
{/* galeria */}

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <h3>Lo que dicen nuestros clientes</h3>
        <div className="testimonials-grid">
          <div className="testimonial">
            <img src={carlos} alt="Carlos" className="testimonial-img" />
            <p>"Excelente calidad, una experiencia de vaporización inigualable. ¡Lo recomiendo totalmente!"</p>
            <h4>Carlos M.</h4>
          </div>
          <div className="testimonial">
            <img src={ana} alt="Ana" className="testimonial-img" />
            <p>"Me encanta saber que estoy apoyando una empresa que promueve el cuidado del medio ambiente y la salud de sus usuarios."</p>
            <h4>Ana L.</h4>
          </div>
          <div className="testimonial">
            <img src={raul} alt="Raul" className="testimonial-img" />
            <p>"Los sabores son impresionantes, especialmente los que imitan el tabaco. ¡Un gran hallazgo!"</p>
            <h4>Raúl S.</h4>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact-section">
        <h3>¿Tienes preguntas? Estamos aquí para ayudarte</h3>
        <p>Si necesitas más información sobre nuestros productos, no dudes en ponerte en contacto con nosotros. ¡Estaremos encantados de ayudarte!</p>
        <button className="contact-button" onClick={handleClick}>
          Contáctanos Ahora
        </button>
      </section>
    </div>
  );
};
