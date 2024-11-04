import React from 'react';
import '../styles/Home.css';  
import gato from "../images/imagen_home.jpeg"
import carlos from "../images/carlos.jpg";
import ana from "../images/ana.jpg";
import raul from "../images/raul.jpg";
import sergio from "../images/sergio.jpg";
import mariana from "../images/mariana.jpg";
import javier from "../images/javier.jpg";
import { FaHandsHelping, FaShoppingBag, FaLeaf } from "react-icons/fa";

export const Home = () => {
  const handleClick = () => {
    window.location.href = 'https://wa.me/5493764331313';
  };

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-text">
          <h1>Bienvenido a El Gato Negro</h1>
          <p>E-liquids de primera calidad, creados pensando en vos.</p>
          <button className="cta-button" onClick={handleClick}>Contáctanos</button>
        </div>
        <img src={gato} alt="El Gato Negro" className="hero-image"/>
      </section>

      {/* About Section */}
      <section className="about-section">
        <div className="about-content">
          <h2>¿Por qué El Gato Negro?</h2>
          <p>En El Gato Negro, creamos productos únicos con ingredientes de la más alta calidad, comprometidos con vos y tu salud. </p>
        </div>
      </section>

      {/* Features Section */}
      {/* <section className="features-section">
        <h3>Nuestro Compromiso</h3>
        <div className="features-grid">
          <div className="feature">
            <h4>Compromiso Social</h4>
            <p>Donamos Una parte de nuestros ingresos a hogares y comedores populares.</p>
          </div>
          <div className="feature">
            <h4>Compre Local</h4>
            <p>Apoya la economía local eligiendo productos nacionales, hechos acá, por gente de acá.</p>
          </div>
          <div className="feature">
            <h4>Cuidado Ambiental</h4>
            <p>Promovemos el uso de productos reparables y sostenibles y reusamos envases en buen estado.</p>
          </div>
        </div>
      </section> */}

<section className="features-section">
      <h3>Nuestro Compromiso</h3>
      <div className="features-grid">
        <div className="feature">
          <FaHandsHelping className="feature-icon" />
          <h4>Compromiso Social</h4>
          <p>Donamos una parte de nuestros ingresos a hogares y comedores populares.</p>
        </div>
        <div className="feature">
          <FaShoppingBag className="feature-icon" />
          <h4>Compre Local</h4>
          <p>Apoya la economía local eligiendo productos nacionales, hechos acá, por gente de acá.</p>
        </div>
        <div className="feature">
          <FaLeaf className="feature-icon" />
          <h4>Cuidado Ambiental</h4>
          <p>Promovemos el uso de productos reparables y sostenibles y reusamos envases en buen estado.</p>
        </div>
      </div>
    </section>


      {/* Testimonials Section */}
      {/* <section className="testimonials-section">
        <h3>Testimonios</h3>
        <div className="testimonials-grid">
          <div className="testimonial">
            <img src={carlos} alt="Carlos" />
            <p>"La mejor calidad que he probado, ¡incomparable!"</p>
            <h4>Carlos M.</h4>
          </div>
          <div className="testimonial">
            <img src={ana} alt="Ana" />
            <p>"Un producto increíble que además apoya el comercio local."</p>
            <h4>Ana L.</h4>
          </div>
          <div className="testimonial">
            <img src={raul} alt="Raul" />
            <p>"Sabores insuperables, especialmente su blend de tabaco."</p>
            <h4>Raúl S.</h4>
          </div>
        </div>
      </section> */}

<section className="testimonials-section">
      <h3>Testimonios</h3>
      <div className="testimonials-grid">
        <div className="testimonial">
          <img src={carlos} alt="Carlos" className="testimonial-img" />
          <p>"La mejor calidad que he probado, ¡incomparable!"</p>
          <h4>Carlos M.</h4>
        </div>
        <div className="testimonial">
          <img src={ana} alt="Ana" className="testimonial-img" />
          <p>"Un producto increíble que además apoya el comercio local."</p>
          <h4>Ana L.</h4>
        </div>
        <div className="testimonial">
          <img src={raul} alt="Raul" className="testimonial-img" />
          <p>"Sabores insuperables, especialmente su blend de tabaco."</p>
          <h4>Raúl S.</h4>
        </div>
      </div>
    </section>

      {/* Contact Section */}
      <section className="contact-section">
        <h3>Contáctanos</h3>
        <p>¿Tienes preguntas? Estamos aquí para ayudarte.</p>
        <button className="contact-button" onClick={handleClick}>Escríbenos</button>
      </section>
    </div>
  );
};

// import React from 'react';
// import '../styles/Home.css';  // Estilos mejorados en el archivo CSS
// import gato from "../images/home_Imagen.png";
// import carlos from "../images/carlos.jpg";
// import ana from "../images/ana.jpg";
// import raul from "../images/raul.jpg";
// import sergio from "../images/sergio.jpg";
// import mariana from "../images/mariana.jpg";
// import javier from "../images/javier.jpg";

// export const Home = () => {
//   const handleClick = () => {
//     window.location.href = 'https://wa.me/5493764331313';
//   };

//   return (
//     <div className="home-container">
//       {/* About Section */}
//       <div className="about-section text-center">
//         <table className="about-table">
//           <tbody>
//             <tr>
//               <td className="text-container">
//                 <h2 className="section-title">Hola!</h2>
//                 <p>
//                   Bienvenido a la tienda del Gato Negro, donde hacemos e-liquids de primera aquí mismo, pensados para vos que sí sabés lo que querés. Usamos ingredientes de calidad y nos preocupamos por el medio ambiente porque en El Gato Negro somos anti descartables. Nuestros productos son únicos y tienen ese toque cálido que te hará disfrutar en cada calada.
//                 </p>
//               </td>
//               <td className="image-container">
//                 <img src={gato} alt="About Us" className="img-fluid-about-image" />
//               </td>
//             </tr>
//           </tbody>
//         </table>
//       </div>

//       {/* Features Section */}
//       <div className="features-section text-center">
//         <h3 className="section-title">Porqué elegirnos</h3>
//         <table className="features-table">
//           <tbody>
//             <tr>
//               <td className="feature">
//                 <h3>Calidad</h3>
//                 <p>Nuestros e-liquids están hechos con los mejores ingredientes, asegurando una experiencia de vapeo segura y placentera en cada uso.</p>
//               </td>
//               <td className="feature">
//                 <h3>Compre Local</h3>
//                 <p>Al elegir nuestros productos, estás apoyando a la industria nacional, generando empleo y fomentando el desarrollo local.</p>
//               </td>
//               <td className="feature">
//                 <h3>Cuidado Ambiental</h3>
//                 <p>Promovemos el uso de reparables, nos comprometemos a cuidar el planeta mientras disfrutas de un vapeo de calidad.</p>
//               </td>
//             </tr>
//             <tr>
//               <td className="feature">
//                 <h3>Rapidez y Atención Cercana</h3>
//                 <p>Disfrutá de entregas rápidas y un servicio al cliente personalizado. Estamos siempre aquí para ayudarte.</p>
//               </td>
//               <td className="feature">
//                 <h3>Sabores Adaptados al Mercado Local</h3>
//                 <p>Desde lo clásico hasta lo innovador, nuestras mezclas están diseñadas para satisfacer tus preferencias únicas.</p>
//               </td>
//               <td className="feature">
//                 <h3>Transparencia en la Producción</h3>
//                 <p>Sabés exactamente lo que estás vapeando. No queremos que te metas cualquier cosa. Nuestros procesos son claros, garantizando seguridad y calidad en cada botella.</p>
//               </td>
//             </tr>
//           </tbody>
//         </table>
//       </div>

//       {/* Testimonios Section */}
//       <div className="testimonials-section text-center">
//         <h2 className="section-title">Testimonios</h2>
//         <table className="testimonials-table">
//           <tbody>
//             <tr>
//               <td className="testimonial-col">
//                 <img src={carlos} alt="Carlos M." className="testimonial-img" />
//                 <h4>Carlos M., 35 años, Profesional de Tecnología</h4>
//                 <p>"He probado muchos e-liquids a lo largo de los años, pero ninguno como El Gato Negro. La calidad es incomparable, y el hecho de que sea un producto local lo hace aún mejor. Mi sabor favorito es el Reserve, ¡es insuperable!"</p>
//               </td>
//               <td className="testimonial-col">
//                 <img src={ana} alt="Ana L." className="testimonial-img" />
//                 <h4>Ana L., 28 años, Diseñadora Gráfica</h4>
//                 <p>"Siempre busco productos que no solo sean buenos, sino que también tengan un impacto positivo. Con El Gato Negro, sé que estoy eligiendo un e-liquid de calidad y que además apoya la economía local. Los sabores son únicos y la atención al cliente es fantástica. Mi líquido preferido es Bourbon"</p>
//               </td>
//               <td className="testimonial-col">
//                 <img src={raul} alt="Raúl S." className="testimonial-img" />
//                 <h4>Raúl S., 37 años, Empresario</h4>
//                 <p>"El Gato Negro me sorprendió por su consistencia y sabor. Particularmente el Blend de tabacos que prepara. A mi edad, prefiero productos confiables, y este e-liquid cumple con todas mis expectativas. Además, la atención y la postventa que ofrece es inmejorable."</p>
//               </td>
//             </tr>
//             <tr>
//               <td className="testimonial-col">
//                 <img src={sergio} alt="Sergio A." className="testimonial-img" />
//                 <h4>Sergio A., 40 años, Contador</h4>
//                 <p>"El Gato me asombra, logra mantener el mismo producto a través del tiempo, además, cuando quiero variar un poco, modifica ligeramente mi e-liquid para disfrutar otra experiencia. Es un Capo Total! Suelo comprar siempre el Carta Robada"</p>
//               </td>
//               <td className="testimonial-col">
//                 <img src={javier} alt="Javier R." className="testimonial-img" />
//                 <h4>Javier R., 45 años, Ingeniero de Software</h4>
//                 <p>"El Gato Negro me sorprendió desde el primer momento. La calidad de los ingredientes es evidente, y el sabor es simplemente perfecto. Me encanta que sea un producto nacional, y no puedo dejar de recomendar el sabor Bourbon. ¡Es mi favorito!"</p>
//               </td>
//               <td className="testimonial-col">
//                 <img src={mariana} alt="Mariana G." className="testimonial-img" />
//                 <h4>Mariana G., 52 años, Profesora de Yoga</h4>
//                 <p>"Como alguien que valora un estilo de vida saludable y equilibrado, es importante para mí elegir productos de calidad. El Gato Negro no solo ofrece sabores deliciosos, sino que también tiene un enfoque sostenible y responsable. Mi elección es el sabor Cushman y Heisenberg, ¡refrescantes y únicos!"</p>
//               </td>
//             </tr>
//           </tbody>
//         </table>
//       </div>

//       {/* Contact Section */}
//       <div className="contact-section text-center">
//         <h2 className="section-title">Contáctanos</h2>
//         <p>¿Tienes preguntas o necesitas asistencia? No dudes en ponerte en contacto con nosotros.</p>
//         <button className="contact-button" onClick={handleClick}>
//           Contactar
//         </button>
//       </div>
//     </div>
//   );
// };
