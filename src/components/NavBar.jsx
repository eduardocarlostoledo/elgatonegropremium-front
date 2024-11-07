import { Link, useNavigate } from "react-router-dom";
import "../styles/NavBar.css";
import { FaShoppingBag, FaHome, FaOpencart } from "react-icons/fa";
import { BiLogOutCircle } from "react-icons/bi";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  deleteUserLocalStorage,
  changeNav,
  userActive,
} from "../redux/slices/userSlice.js";
import { getCart, deleteAllFromCart } from "../redux/slices/cartSlice.js";
import logoinvertido from "../img/logoinvertido.png"

export const NavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const carts = useSelector((state) => state.cart.items) || [];
  const user = useSelector((state) => state.users.userActive);
  const itemQuantity = carts.reduce((acc, item) => acc + item.amount, 0);

  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);

  function CerrarSes(e) {
    e.preventDefault();
    dispatch(deleteUserLocalStorage());
    localStorage.removeItem("userActive");
    localStorage.clear();

    navigate("/");
    localStorage.setItem("isAuthenticated", "afuera");
    console.log("logout");
  }

  // const CerrarSes = (e) => {
  //   e.preventDefault();
  //   setTimeout(() => {
  //     dispatch(deleteUserLocalStorage());
  //     dispatch(changeNav(true));
  //     dispatch(deleteAllFromCart());
  //     localStorage.setItem("isAuthenticated", "afuera");
  //     navigate("/Login");
  //   }, 1300);
  // };

  return (
    <div className="NavDiv">

      
<a className="FixedLogo" title="El Gato Invertido">
          <img src={logoinvertido} alt="Logo"  
          width="120"
          height="120" 
          />
        </a>

        <a
          className="botonwhatsapp"
          href="https://wa.me/5493764331313"
          title="El Gato"
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/800px-WhatsApp.svg.png"
            alt="WhatsApp El Gato"
            width="40"
            height="40"
          />
        </a>

        
      <div className="BuildAndProducts">
        <Link to="/">
          <button>
            <FaHome className="iconHome" /> Inicio
          </button>
        </Link>
        <Link to="/Products">
          <button>Tienda</button>
        </Link>
        <Link to="/Cart">
          <button className="CartContainer">
            <FaOpencart className="Cart" />
          </button>
        </Link>


        {/* Muestra todos los botones sin condicionales */}
        <Link to="/Login">
          <button>Iniciar Sesión</button>
        </Link>
        <Link to="/Register">
          <button>Registro</button>
        </Link>
        <Link to="/Profile">
          <button>Perfil</button>
        </Link>
        <button className="logOutNavBar" onClick={CerrarSes}>
          <BiLogOutCircle /> Logout
        </button>
      </div>
    </div>
  );
};

export default NavBar;
