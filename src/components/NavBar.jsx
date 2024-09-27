import { Link, useNavigate } from "react-router-dom";
import "../styles/NavBar.css";
import { FaShoppingBag, FaHome, FaOpencart } from "react-icons/fa";
import { BiLogOutCircle } from "react-icons/bi";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getCart } from "../redux/actions/CartActions";
import { deleteUserLocalStorage, ChangeNav } from "../redux/actions/UsersActions"; // Asegúrate de tener esta acción
import { deleteAllFromCart } from "../redux/actions/CartActions"; // Si deseas limpiar el carrito al cerrar sesión

export const NavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Obtener datos del carrito y estado de autenticación del usuario
  const carts = useSelector((state) => state.cart);
  const user = useSelector((state) => state.userActive); // Asumimos que "user" contiene la información del usuario logueado
  const usuarioConectado = useSelector((state)=> state.ChangeNav);

console.log("estado de usuario navbar", user )
console.log("estado de ChangeNav usuario conectado", usuarioConectado )

//   console.log('Cart Items:', carts); // Verifica que `carts` contenga los datos esperados

  const itemQuantity = carts.reduce((acc, item) => acc + item.amount, 0);
  //console.log('Item Quantity:', itemQuantity); // Verifica que `itemQuantity` sea correcto

  // Cargar el carrito cuando se carga el componente
  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);

  // Función para cerrar sesión
  const CerrarSes = (e) => {
    e.preventDefault();
    setTimeout(() => {
      dispatch(deleteUserLocalStorage());
      dispatch(ChangeNav(true))
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
          <a className="botonwhatsapp" title="El Gato" href="https://wa.me/5493764331313">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/800px-WhatsApp.svg.png" alt="WhatsApp El Gato" width="40" height="40" />
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

<Link to="/Cart">
            <button className="CartContainer">
              <FaOpencart className="Cart" />
              {itemQuantity}
            </button>
          </Link>


        </div>

        <div className="ContainerInfo">
          
        </div>
      </div>

      <div className="Responsive">
        <div className="HomeButton">
          <Link to="/">
            <FaHome color="white" size="40px" style={{ top: "15px", right: "0px", cursor: "pointer" }} />
          </Link>
          <Link to="/Products">
            <FaShoppingBag color="white" size="25px" style={{ marginLeft: "15px", top: "10px", right: "0px", cursor: "pointer" }} />
          </Link>

          <Link to="/Cart">
            <button >
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

        <div>
          
        </div>
      </div>
    </div>
  );
};

export default NavBar;


// import { Link } from "react-router-dom";
// import "../styles/NavBar.css";
// //import { AiOutlineShoppingCart, AiOutlineHome } from "react-icons/ai";
// import { FaShoppingBag } from "react-icons/fa";
// import { FaHome } from "react-icons/fa";
// import { FaOpencart } from "react-icons/fa";
// import { useSelector, useDispatch } from "react-redux";
// import { useEffect } from "react";
// import { getCart } from "../redux/actions/CartActions";

// export const NavBar = () => {
//   const dispatch = useDispatch();
//   const carts = useSelector((state) => state.cart);
// console.log('Cart Items:', carts); // Verifica que `carts` contenga los datos esperados

// const itemQuantity = carts.reduce((acc, item) => acc + item.amount, 0);
// console.log('Item Quantity:', itemQuantity); // Verifica que `itemQuantity` sea correcto


//   useEffect(() => {
//     dispatch(getCart());
//   }, [dispatch]);

//   return (
//     <div className="NavDiv">
//       <div className="NotResponsive">
//         <div className="BuildAndProducts">
//           <Link to="/">
//             <button>
//               <ion-icon className="iconHome" name="home-outline"></ion-icon>{" "}
//               Inicio
//             </button>
//           </Link>
//           <Link to="/Products">
//             <button>Tienda</button>
//           </Link>
//           <a className="botonwhatsapp" title="El Gato" href="https://wa.me/5493764331313">
//             <img src="https://www.pixmagik.com/media/wysiwyg/logo_whatsapp.png" alt="WhatsApp El Gato" width="40" height="40" />
//           </a>
//         </div>
//         <div className="ContainerInfo">
//           <Link to="/Cart">
//             <button className="CartContainer">
//               <FaOpencart className="Cart" />
//               {itemQuantity}
//             </button>
//           </Link>
//         </div>
//       </div>

//       <div className="Responsive">
//       <div className="HomeButton">
//   <Link to="/">
//     <FaHome color="white" size="40px" style={{ top: "15px", right: "0px", cursor: "pointer" }} />
//   </Link>
//   <Link to="/Products">
//     <FaShoppingBag color="white" size="25px" style={{ marginLeft: "15px", top: "10px", right: "0px", cursor: "pointer" }} />
//   </Link>
// </div>


//         <div className="ContainerInfo">
//           <Link to="/Cart">
//             <button className="CartContainer">
//               <FaOpencart size="40px" className="Cart" />
//               {itemQuantity}
//             </button>
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

