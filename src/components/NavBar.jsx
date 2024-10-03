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
} from "../redux/slices/userSlice.js"; // Asegúrate de tener esta acción
import { getCart, deleteAllFromCart } from "../redux/slices/cartSlice.js"; // Si deseas limpiar el carrito al cerrar sesión

export const NavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const carts = useSelector((state) => state.cart.items);
  const user = useSelector((state) => state.users.userActive); // Asumimos que "user" contiene la información del usuario logueado
  const usuarioConectado = useSelector((state) => state.users.userActive);
  const itemQuantity = carts.reduce((acc, item) => acc + item.amount, 0);

  const cartItems = useSelector((state) => state.cart.items);
  const totalItems = cartItems.reduce((acc, item) => acc + item.amount, 0);
  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.amount,
    0
  );

  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);

  // Función para cerrar sesión
  const CerrarSes = (e) => {
    e.preventDefault();
    setTimeout(() => {
      dispatch(deleteUserLocalStorage());
      dispatch(changeNav(true));
      dispatch(deleteAllFromCart()); // Limpia el carrito al cerrar sesión
      //window.localStorage.removeItem("USUARIO");
      localStorage.setItem("isAuthenticated", "afuera");
      navigate("/Login");
    }, 1300);
  };

  return (
    <div className="NavDiv">
      <div className="NotResponsive">
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
              <span>${total}</span>
            </button>
          </Link>
          <a
            className="botonwhatsapp"
            title="El Gato"
            href="https://wa.me/5493764331313"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/800px-WhatsApp.svg.png"
              alt="WhatsApp El Gato"
              width="40"
              height="40"
            />
          </a>

          {/* Mostrar botones dependiendo del estado de autenticación */}

          {!user?.status && !usuarioConectado ? (
            <>
              <Link to="/Login">
                <button>Login</button>
              </Link>
              <Link to="/Register">
                <button>Registro</button>
              </Link>
            </>
          ) : (
            <>
              <Link to="/Profile">
                <button>Perfil</button>
              </Link>
              <button className="logOutNavBar" onClick={(e) => CerrarSes(e)}>
                <BiLogOutCircle /> Logout
              </button>
            </>
          )}
        </div>

        <div className="ContainerInfo"></div>
      </div>

      <div className="Responsive">
        <div className="HomeButton">
          <Link to="/">
            <FaHome
              color="white"
              size="40px"
              style={{ top: "15px", right: "0px", cursor: "pointer" }}
            />
          </Link>
          <Link to="/Products">
            <FaShoppingBag
              color="white"
              size="25px"
              style={{
                marginLeft: "15px",
                top: "10px",
                right: "0px",
                cursor: "pointer",
              }}
            />
          </Link>

          <Link to="/Cart">
            <button>
              <FaOpencart size="40px" className="Cart" />
              {itemQuantity}
            </button>
          </Link>

          {!user?.isAuthenticated ? (
            <>
              <Link to="/Login">
                <button>Iniciar Sesión</button>
              </Link>
              <Link to="/Register">
                <button>Registro</button>
              </Link>
            </>
          ) : (
            <>
              <Link to="/Profile">
                <button>Perfil</button>
              </Link>
              <button className="logout" onClick={(e) => CerrarSes(e)}>
                <BiLogOutCircle /> Cerrar Sesión
              </button>
            </>
          )}
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default NavBar;
