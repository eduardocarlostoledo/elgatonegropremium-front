import React from "react";
import { motion } from "framer-motion";
import "../styles/Home.css";
import { FaHandsHelping, FaShoppingBag, FaLeaf, FaShippingFast, FaPercentage, FaCreditCard } from "react-icons/fa";
import { ChatBot } from "./ChatBot";

// Productos de ejemplo (puedes reemplazarlos con tus productos reales)
const featuredProducts = [
  {
    id: 1,
    name: "Kit Super Térmico Frizado + Guantes + Medias Tubo",
    price: "$26.612",
    discount: "70% OFF",
    freeShipping: true
  },
  {
    id: 2,
    name: "Router Mercusya MW30GR V2 blanco",
    price: "$15.900",
    discount: "50% OFF",
    freeShipping: true
  },
  {
    id: 3,
    name: "Juego De Sábanas 4 Piezas 240 Hilos",
    price: "$32.640",
    originalPrice: "$5.440",
    discount: "40% OFF",
    freeShipping: false
  },
  {
    id: 4,
    name: "Creatina Monohydrate Star Nutrition",
    price: "$25.835",
    discount: "35% OFF",
    freeShipping: true
  }
];

const categories = [
  { name: "ZAPATILLAS", discount: "30% OFF", installments: "9 CUOTAS" },
  { name: "SUPLEMENTOS", discount: "40% OFF", installments: "6 CUOTAS" },
  { name: "BELLEZA", discount: "35% OFF", installments: "" },
  { name: "ELECTRODOMÉSTICOS", discount: "40% OFF", installments: "" },
  { name: "CLIMATIZACIÓN", discount: "35% OFF", installments: "" },
  { name: "AUDIO", discount: "30% OFF", installments: "" },
  { name: "COMPUTACIÓN", discount: "30% OFF", installments: "" },
  { name: "GAMING", discount: "30% OFF", installments: "" }
];

export const Home = () => {
  const handleClick = () => {
    window.location.href = "https://wa.me/5493764331313";
  };

  return (
    <div className="home-container">
      {/* Banner de Descuento */}
      <motion.section 
        className="discount-banner"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="discount-tag">DESCUENTO</div>
        <h2>HASTA 70% OFF</h2>
        <p>EL ENVÍO MÁS RÁPIDO DE TODA ARGENTINA</p>
        <div className="free-shipping">
          <FaShippingFast className="shipping-icon" />
          <span>¡ARMA TU CARRITO Y ALCANZA EL ENVÍO GRATIS! <a href="#">Ver más</a></span>
        </div>
      </motion.section>

      {/* Productos Destacados */}
      <section className="featured-products">
        <h2>EXPLORÁ NUESTROS DESTACADOS</h2>
        <div className="products-grid">
          {featuredProducts.map((product) => (
            <motion.div 
              key={product.id}
              className="product-card"
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <div className="product-discount">{product.discount}</div>
              {product.freeShipping && <div className="free-shipping-tag">ENVÍO GRATIS</div>}
              <div className="product-info">
                <h3>{product.name}</h3>
                <div className="product-pricing">
                  {product.originalPrice && <span className="original-price">{product.originalPrice}</span>}
                  <span className="current-price">{product.price}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Categorías */}
      <section className="categories-section">
        <h2>¡APROVECHÁ ESTAS OFERTAS BOMBA! 🌟</h2>
        <div className="categories-grid">
          {categories.map((category, index) => (
            <motion.div 
              key={index}
              className="category-card"
              whileHover={{ scale: 1.05 }}
            >
              <div className="category-discount">
                <FaPercentage />
                <span>{category.discount}</span>
              </div>
              <h3>{category.name}</h3>
              {category.installments && <p>HASTA {category.installments}</p>}
            </motion.div>
          ))}
        </div>
      </section>

      {/* Oferta Especial */}
      <motion.section 
        className="special-offer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <div className="offer-content">
          <h2>LAS MEJORES OFERTAS</h2>
          <div className="offer-tag">50% OFF</div>
          <p>HASTA</p>
          <p>ENVIOS EN 24 HORAS</p>
        </div>
      </motion.section>

      {/* Nuestros Valores */}
      <section className="values-section">
        <h3>Compromisos que nos definen</h3>
        <div className="values-grid">
          <div className="value-card">
            <FaHandsHelping className="value-icon" />
            <h4>Compromiso con la Comunidad</h4>
            <p>Parte de nuestras ganancias se destinan a apoyar organizaciones y comedores populares.</p>
          </div>
          <div className="value-card">
            <FaShoppingBag className="value-icon" />
            <h4>Apoyo a la Economía Local</h4>
            <p>Productos elaborados localmente, fortaleciendo la economía y creando empleo.</p>
          </div>
          <div className="value-card">
            <FaLeaf className="value-icon" />
            <h4>Cuidado Ambiental</h4>
            <p>Envases reciclables y reparables, contribuyendo al cuidado del medio ambiente.</p>
          </div>
        </div>
      </section>

      {/* ChatBot */}
      <motion.section 
        className="chatbot-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <h3>¿Necesitás ayuda? Hablá con nuestro asistente</h3>
        <div className="chatbot-container">
          <ChatBot />
        </div>
      </motion.section>

      {/* Contacto */}
      <section className="contact-section">
        <h3>¿Tenés preguntas? Estamos aquí para ayudarte</h3>
        <motion.button 
          className="contact-button" 
          onClick={handleClick}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Contáctanos Ahora
        </motion.button>
      </section>
    </div>
  );
};

// import React from "react";
// import "../styles/Home.css";
// import gato from "../images/imagen_home.jpeg";
// import carlos from "../images/carlos.jpg";
// import ana from "../images/ana.jpg";
// import raul from "../images/raul.jpg";
// import sergio from "../images/sergio.jpg";
// import mariana from "../images/mariana.jpg";
// import javier from "../images/javier.jpg";
// import cushman from "../images/cushman.jpg"
// import heisenberg from "../images/heisenberg.jpg"
// import gatogafas from "../images/gato.jpg"
// import { FaHandsHelping, FaShoppingBag, FaLeaf } from "react-icons/fa";
// import {ChatBot} from "./ChatBot";

// export const Home = () => {
//   const handleClick = () => {
//     window.location.href = "https://wa.me/5493764331313";
//   };

//   return (
//     <div className="home-container">
//       {/* Hero Section */}
//       <section className="hero-section">
//         <div className="hero-text">
//           <h1>El Gato Negro Premium</h1>
//         </div>
//       </section>

//       {/* About Section */}
//       <section className="about-section">
        
//       </section>

//       {/* Features Section */}
//       <section className="features-section">
//         <h2>¿Por qué elegirnos?</h2>
//         <div className="features-grid">
//           <div className="feature">
//           <h2>Innovación y Compromiso con Tu Salud</h2>
//             <p>
//               E-liquids cuidadosamente elaborados con los mejores ingredientes para brindarte la máxima satisfacción. Usando aromas de calidad de los mejores alquimistas de Argentina y de USA.
//             </p>
//             <div className="about-content">
          
          
//         </div>

//           </div>
//           <div className="feature">
//             <img src={gato} alt="El Gato Negro" className="hero-image" />
//           </div>
//           <div className="feature">
//             <h2>
//               Porque tu salud es nuestra prioridad.
//             </h2>

//             <p>
//             Nos comprometemos con la calidad y la seguridad en todos nuestros productos. Nos especializamos en ofrecer productos de vaporización de alta calidad. Cada uno de nuestros e-liquids es formulado con ingredientes premium, para que disfrutes de una experiencia única sin comprometer tu bienestar.
//           </p>

//           </div>
//         </div>
//       </section>

//       {/* Nuestro Compromiso */}
//       <section className="features-section">
//         <h3>Compromisos que nos definen</h3>
//         <div className="features-grid">
//           <div className="feature">
//             <FaHandsHelping className="feature-icon" />
//             <h4>Compromiso con la Comunidad</h4>
//             <p>
//               Parte de nuestras ganancias se destinan a apoyar a organizaciones y comedores populares, fomentando el bienestar de quienes más lo necesitan.
//             </p>
//           </div>
//           <div className="feature">
//             <FaShoppingBag className="feature-icon" />
//             <h4>Apoyo a la Economía Local</h4>
//             <p>
//               Nuestros productos son elaborados localmente, ayudando a fortalecer la economía y creando empleo en nuestra comunidad.
//             </p>
//           </div>
//           <div className="feature">
//             <FaLeaf className="feature-icon" />
//             <h4>Cuidado Ambiental</h4>
//             <p>
//               Promovemos el uso de envases reciclables y reparables, contribuyendo al cuidado del medio ambiente. Nuestros productos están diseñados para ser sostenibles.
//             </p>
//           </div>
//         </div>
//       </section>
// {/* galeria */}
//       {/* <section className="features-section">
//         <h3>Compromisos que nos definen</h3>
//         <div className="features-grid">
        
//         <div className="feature">
//             <img src={heisenberg} alt="El Gato Negro" className="hero-image" />
//           </div>

//           <div className="feature">
//             <img src={gatogafas} alt="El Gato Negro" className="hero-image" />
//           </div>

//           <div className="feature">
//             <img src={cushman} alt="El Gato Negro" className="hero-image" />
//           </div>

//         </div>
//       </section> */}
// {/* galeria */}

//       {/* Testimonials Section */}
//       <section className="testimonials-section">
//         <h3>Lo que dicen nuestros clientes</h3>
//         <div className="testimonials-grid">
//           <div className="testimonial">
//             <img src={carlos} alt="Carlos" className="testimonial-img" />
//             <p>"Excelente calidad, una experiencia de vaporización inigualable. ¡Lo recomiendo totalmente!"</p>
//             <h4>Carlos M.</h4>
//           </div>
//           <div className="testimonial">
//             <img src={ana} alt="Ana" className="testimonial-img" />
//             <p>"Me encanta saber que estoy apoyando una empresa que promueve el cuidado del medio ambiente y la salud de sus usuarios."</p>
//             <h4>Ana L.</h4>
//           </div>
//           <div className="testimonial">
//             <img src={raul} alt="Raul" className="testimonial-img" />
//             <p>"Los sabores son impresionantes, especialmente los que imitan el tabaco. ¡Un gran hallazgo!"</p>
//             <h4>Raúl S.</h4>
//           </div>
//         </div>
//       </section>

//       <section className="testimonials-section">
//         <h3>Habla con Un Asesor</h3>
//         <div className="testimonials-grid">
          
          
//           <div className="testimonial">
//             <ChatBot />
//           </div>
//         </div>
//       </section>

//       {/* Contact Section */}
//       <section className="contact-section">
//         <h3>¿Tienes preguntas? Estamos aquí para ayudarte</h3>
//         <p>Si necesitas más información sobre nuestros productos, no dudes en ponerte en contacto con nosotros. ¡Estaremos encantados de ayudarte!</p>
//         <button className="contact-button" onClick={handleClick}>
//           Contáctanos Ahora
//         </button>
//       </section>
//     </div>
//   );
// };
