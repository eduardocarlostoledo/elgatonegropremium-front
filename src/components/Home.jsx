import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import '../styles/Home.css';  // Estilos mejorados en el archivo CSS
import gato from "../images/home_Imagen.png";
import carlos from "../images/carlos.jpg";
import ana from "../images/ana.jpg";
import raul from "../images/raul.jpg";
import sergio from "../images/sergio.jpg";
import mariana from "../images/mariana.jpg";
import javier from "../images/javier.jpg";

export const Home = () => {

  const handleClick = () => {
    window.location.href = 'https://wa.me/5493764331313';
};


  return (
    <div className="home-container">
      {/* About Section */}
      <Container className="about-section text-center">
        <Row className="align-items-center">
          <Col md={4} sm={12} className="text-container">
            <h2 className="section-title">Hola!</h2>
            <p>
            Bienvenido a la tienda del Gato Negro, donde hacemos e-liquids de primera aquí mismo, pensados para vos que sí sabés lo que querés. Usamos ingredientes de calidad y nos preocupamos por el medio ambiente porque en El Gato Negro somos anti descartables. Nuestros productos son únicos y tienen ese toque cálido que te hará disfrutar en cada calada.
            </p>
          </Col>
          <Col md={4} sm={12} className="image-container">
            <img src={gato} alt="About Us" className="img-fluid about-image" />
          </Col>
        </Row>
      </Container>

      {/* Features Section */}
      <Container className="features-section text-center">
        <h3 className="section-title">Porqué elegirnos</h3>
        <Row>
          <Col xs={12} md={4} className="feature">
            <h3>Calidad</h3>
            <p>Nuestros e-liquids están hechos con los mejores ingredientes, asegurando una experiencia de vapeo segura y placentera en cada uso.</p>
          </Col>
          <Col xs={12} md={4} className="feature">
            <h3>Compre Local</h3>
            <p>Al elegir nuestros productos, estás apoyando a la industria nacional, generando empleo y fomentando el desarrollo local.</p>
          </Col>
          <Col xs={12} md={4} className="feature">
            <h3>Cuidado Ambiental</h3>
            <p>Promovemos el uso de reparables, nos comprometemos a cuidar el planeta mientras disfrutas de un vapeo de calidad.</p>
          </Col>
          <Col xs={12} md={4} className="feature">
            <h3>Rapidez y Atención Cercana</h3>
            <p>Disfrutá de entregas rápidas y un servicio al cliente personalizado. Estamos siempre aquí para ayudarte.</p>
          </Col>
          <Col xs={12} md={4} className="feature">
            <h3>Sabores Adaptados al Mercado Local</h3>
            <p>Desde lo clásico hasta lo innovador, nuestras mezclas están diseñadas para satisfacer tus preferencias únicas.</p>
          </Col>
          <Col xs={12} md={4} className="feature">
            <h3>Transparencia en la Producción</h3>
            <p>Sabés exactamente lo que estás vapeando. No queremos que te metas cualquier cosa. Nuestros procesos son claros, garantizando seguridad y calidad en cada botella.</p>
          </Col>
        </Row>
      </Container>

      {/* Testimonios Section */}
      <Container className="testimonials-section text-center">
        <h2 className="section-title">Testimonios</h2>
        <Row>
          <Col xs={12} sm={6} md={4} className="testimonial-col">
            <img src={carlos} alt="Carlos M." className="testimonial-img" />
            <h4>Carlos M., 35 años, Profesional de Tecnología</h4>
            <p>"He probado muchos e-liquids a lo largo de los años, pero ninguno como El Gato Negro. La calidad es incomparable, y el hecho de que sea un producto local lo hace aún mejor. Mi sabor favorito es el Reserve, ¡es insuperable!"</p>
          </Col>
          <Col xs={12} sm={6} md={4} className="testimonial-col">
            <img src={ana} alt="Ana L." className="testimonial-img" />
            <h4>Ana L., 28 años, Diseñadora Gráfica</h4>
            <p>"Siempre busco productos que no solo sean buenos, sino que también tengan un impacto positivo. Con El Gato Negro, sé que estoy eligiendo un e-liquid de calidad y que además apoya la economía local. Los sabores son únicos y la atención al cliente es fantástica. Mi líquido preferido es Bourbon"</p>
          </Col>
          <Col xs={12} sm={6} md={4} className="testimonial-col">
            <img src={raul} alt="Raúl S." className="testimonial-img" />
            <h4>Raúl S., 37 años, Empresario</h4>
            <p>""El Gato Negro me sorprendió por su consistencia y sabor. Particularmente el Blend de tabacos que prepara. A mi edad, prefiero productos confiables, y este e-liquid cumple con todas mis expectativas. Además, la atención y la postventa que ofrece es inmejorable."</p>
          </Col>
          <Col xs={12} sm={6} md={4} className="testimonial-col">
            <img src={sergio} alt="Sergio A." className="testimonial-img" />
            <h4>Sergio A., 40 años, Contador</h4>
            <p>"El Gato me asombra, logra mantener el mismo producto a través del tiempo, además, cuando quiero variar un poco, modifica ligeramente mi e-liquid para disfrutar otra experiencia. Es un Capo Total! Suelo comprar siempre el Carta Robada"</p>
          </Col>

          <Col xs={12} sm={6} md={4} className="testimonial-col">
            <img src={javier} alt="Sergio A." className="testimonial-img" />
            <h4>Javier R., 45 años, Ingeniero de Software </h4>
            <p>"El Gato Negro me sorprendió desde el primer momento. La calidad de los ingredientes es evidente, y el sabor es simplemente perfecto. Me encanta que sea un producto nacional, y no puedo dejar de recomendar el sabor Bourbon. ¡Es mi favorito!"</p>
          </Col>

          <Col xs={12} sm={6} md={4} className="testimonial-col">
            <img src={mariana} alt="Sergio A." className="testimonial-img" />
            <h4>Mariana G., 52 años, Profesora de Yoga</h4>
            <p>"Como alguien que valora un estilo de vida saludable y equilibrado, es importante para mí elegir productos de calidad. El Gato Negro no solo ofrece sabores deliciosos, sino que también tiene un enfoque sostenible y responsable. Mi elección es el sabor Cushman y Heisenberg, ¡refrescantes y únicos!"</p>
          </Col>


        </Row>
      </Container>

      {/* Contact Section */}
      <Container className="contact-section text-center">
        <h2 className="section-title">Contáctanos</h2>
        <p>¿Tienes preguntas o necesitas asistencia? No dudes en ponerte en contacto con nosotros.</p>
      
        <Button variant="outline-primary" className="contact-button" onClick={handleClick}>
            Contactar
        </Button>


        
      </Container>
    </div>
  );
};
