import React from "react";
import "../styles/Home.css";
import gato from "../images/imagen_home.jpeg";
import carlos from "../images/carlos.jpg";
import ana from "../images/ana.jpg";
import raul from "../images/raul.jpg";
import sergio from "../images/sergio.jpg";
import mariana from "../images/mariana.jpg";
import javier from "../images/javier.jpg";
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
          <h1>Bienvenido a El Gato Negro 😺</h1>
          <p>E-liquids de primera calidad, creados pensando en vos ✨</p>
          <button className="cta-button" onClick={handleClick}>
            Contáctanos 📲
          </button>
        </div>
        <img src={gato} alt="El Gato Negro" className="hero-image" />
      </section>

      {/* About Section */}
      <section className="about-section">
        <div className="about-content">
          <h2>¿Por qué El Gato Negro? 🤔</h2>
          <p>
            En El Gato Negro, creamos productos únicos con ingredientes de la
            más alta calidad, comprometidos con vos y tu salud ❤️
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h3>Nuestro Compromiso 🤝</h3>
        <div className="features-grid">
          <div className="feature">
            <FaHandsHelping className="feature-icon" />
            <h4>Compromiso Social 🌍</h4>
            <p>
              Donamos una parte de nuestros ingresos a hogares y comedores
              populares 🏠
            </p>
          </div>
          <div className="feature">
            <FaShoppingBag className="feature-icon" />
            <h4>Compre Local 🛍️</h4>
            <p>
              Apoya la economía local eligiendo productos nacionales, hechos
              acá, por gente de acá 👩‍🌾👨‍🏭
            </p>
          </div>
          <div className="feature">
            <FaLeaf className="feature-icon" />
            <h4>Cuidado Ambiental 🌱</h4>
            <p>
              Promovemos el uso de productos reparables y sostenibles y
              reusamos envases en buen estado ♻️
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <h3>Testimonios 💬</h3>
        <div className="testimonials-grid">
          <div className="testimonial">
            <img src={carlos} alt="Carlos" className="testimonial-img" />
            <p>"La mejor calidad que he probado, ¡incomparable! 🌟"</p>
            <h4>Carlos M.</h4>
          </div>
          <div className="testimonial">
            <img src={ana} alt="Ana" className="testimonial-img" />
            <p>"Un producto increíble que además apoya el comercio local 👏"</p>
            <h4>Ana L.</h4>
          </div>
          <div className="testimonial">
            <img src={raul} alt="Raul" className="testimonial-img" />
            <p>"Sabores insuperables, especialmente su blend de tabaco 💨"</p>
            <h4>Raúl S.</h4>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact-section">
        <h3>Contáctanos 📞</h3>
        <p>¿Tienes preguntas? Estamos aquí para ayudarte 💬</p>
        <button className="contact-button" onClick={handleClick}>
          Escríbenos 💌
        </button>
      </section>
    </div>
  );
};
