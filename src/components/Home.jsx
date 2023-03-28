import '../styles/Home.css';
import img1 from '../images/1.jpeg';
import img2 from '../images/2.jpeg';
import img3 from '../images/3.jpeg';
import img4 from '../images/4.jpeg';
import img5 from '../images/5.jpeg';
import img6 from '../images/6.jpeg';
import img7 from '../images/7.jpeg';

/** Coloque un diseño de Boostrap para las Imagenes */
export const Home = () => {
    
    return(
        <div className="HomeContainer">
            <div className='ContainerImages'>
                 {/* Acá esta el Boostrap */}
                <div id="carouselExampleAutoplaying" className="carousel slide" data-bs-ride="carousel">
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                        <img src={img1} className="d-block w-100" alt="" />
                        </div>
                        <div className="carousel-item">
                        <img src={img2} className="d-block w-100" alt="" />
                        </div>
                        <div className="carousel-item">
                        <img src={img3} className="d-block w-100" alt="" />
                        </div>
                        <div className="carousel-item">
                        <img src={img4} className="d-block w-100" alt="" />
                        </div>
                        <div className="carousel-item">
                        <img src={img5} className="d-block w-100" alt="" />
                        </div>
                        <div className="carousel-item">
                        <img src={img6} className="d-block w-100" alt="" />
                        </div>
                        <div className="carousel-item">
                        <img src={img7} className="d-block w-100" alt="" />
                        </div>
                      
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </div> 

        </div>
    )
}