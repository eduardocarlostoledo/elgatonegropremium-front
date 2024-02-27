import React, { useState, useEffect, useCallback } from "react";
import mercadopago from "./mercadopago";
import "../styles/Cart.css";
import swal from "sweetalert";
import ItemCart from "./ItemCart";
import { useDispatch, useSelector } from "react-redux";
import { update } from "../redux/actions/CartActions";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const up = useSelector((state) => state.update);
  const [cartItems, setCartItems] = useState([]);
  const dispatch = useDispatch();
  const userActive = localStorage.getItem("USUARIO")
    ? JSON.parse(localStorage.getItem("USUARIO"))
    : null;
  const navigate = useNavigate();
  const products = useSelector((state) => state.allProducts);

  const fetchData = useCallback(() => {
    fetch(`${process.env.REACT_APP_BACK}/cart`)
      .then((response) => response.json())
      .then((data) => setCartItems([...data]))
      .catch(() => swal("Cart is empty", "Cart is empty", "error"));
  }, [setCartItems]);

  useEffect(() => {
    fetchData();
  }, [up, fetchData]);

  const total = cartItems
    .reduce((acc, item) => acc + item.price * item.amount, 0)
    .toFixed(1);

  const preferencia = cartItems.map((item) => ({
    product_description: item.name,
    product_name: item.name,
    product_image: item.image,
    product_amount: item.amount,
    product_unit_price: item.price,
    prodId: item.prodId,
  }));
  const description = cartItems.map((item) => item.name);
  const total_order_price = total;
  const buyer_email = userActive?.email;
  preferencia.push({
    total_order_price,
    buyer_email,
  });

  const orderData = {
    quantity: 1,
    description: description.toString(),
    price: total,
  };

  const handleCheckout = (e) => {
    e.preventDefault();
    if (!cartItems.length) {
      swal("Cart is empty", "Cart is empty", "error");
    } else if (userActive === null) {
      swal("You must log in to buy!", "You must log in to buy!", "error");
      navigate("/login");
    } else {
      fetch(`${process.env.REACT_APP_BACK}/pay/preference`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(preferencia.reverse()),
      });

      fetch(`${process.env.REACT_APP_BACK}/pay/create_preference`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      })
        .then((response) => response.json())
        .then((preference) => createCheckoutButton(preference.id))
        .catch(() => swal("Unexpected error", "Unexpected error", "error"));
    }
  };

  const createCheckoutButton = (preferenceId) => {
    mercadopago.checkout({
      preference: {
        id: preferenceId,
      },
      render: {
        container: "#button-checkout",
        label: "Pagar con MercadoPago",
      },
    });
  };

  const handleDeleteAllCart = async () => {
    try {
      await fetch(`${process.env.REACT_APP_BACK}/cart`, {
        method: "DELETE",
      });
      setCartItems([]);
      dispatch(update(true));
      swal("Cart is empty", "Cart is empty", "error");
    } catch (error) {
      console.error("Error deleting cart:", error);
      swal("Error", "No se pudo eliminar el carrito", "error");
    }
  };

  return (
    <div className="ContainerCart">
      <div className="botones_de_pago">
        <div className="BotonCheckout">
          <h2 className="h2">Detalle de tu Compra: ${total}</h2>
          <button className="ButtonCart" onClick={handleCheckout}>
            Finalizar Pedido
          </button>
          <div id="button-checkout"></div>
        </div>
      </div>

      <div className="NavCart">
        {cartItems.length === 0 ? (
          <p className="EmptyP">Cart is empty</p>
        ) : (
          cartItems.map((item) => (
            <ItemCart
              name={item.name}
              price={item.price}
              amount={item?.amount}
              image={item.image}
              prodId={item.prodId}
              key={item.id}
              product={products.find((prod) => prod.name === item.name)}
              handleDeleteAllCart={handleDeleteAllCart}
            />
          ))
        )}
      </div>

      <div>
        <button className="ButtonDeleteAll" onClick={handleDeleteAllCart}>
          Vaciar Carrito
        </button>
      </div>
    </div>
  );
}


// import React, { useState, useEffect } from "react";
// import mercadopago from "./mercadopago";
// import "../styles/Cart.css";
// import swal from "sweetalert";
// import ItemCart from "./ItemCart";
// import { useDispatch, useSelector } from "react-redux";
// import { update } from "../redux/actions/CartActions";
// import { useNavigate } from "react-router-dom";

// export default function Cart() {
//   const up = useSelector((state) => state.update);
//   const [cartItems, setCartItems] = useState([]);
//   const dispatch = useDispatch();
//   const userActive =
//     localStorage.getItem("USUARIO") !== null
//       ? JSON.parse(localStorage.getItem("USUARIO"))
//       : null;
//   const navigate = useNavigate();

//   const products = useSelector((state) => state.allProducts);

//   useEffect(() => {
//     fetch(`${process.env.REACT_APP_BACK}/cart`)
//       .then((response) => response.json())
//       .then((data) => setCartItems([...data]))
//       .catch((error) => swal("Cart is empty", "Cart is empty", "error"));
//   }, [up]);

//   const total = cartItems
//     .reduce((acc, item) => acc + item.price * item.amount, 0)
//     .toFixed(1);

//   //seteamos preferencia
//   const preferencia = cartItems.map((item) => ({
//     product_description: item.name,
//     product_name: item.name,
//     product_image: item.image,
//     product_amount: item.amount,
//     product_unit_price: item.price,
//     prodId: item.prodId,
//   }));
//   const description = cartItems.map((item) => item.name); //para orderData
//   const total_order_price = total;
//   const buyer_email = userActive === null ? null : userActive.email;
//   preferencia.push({
//     //agregamos lo q esta fuera del mapeo para mercadopago
//     total_order_price,
//     buyer_email,
//   });
//   //seteamos preferencia
//   const orderData = {
//     quantity: 1,
//     description: description.toString(),
//     price: total,
//   };

//   const handleCheckout = (e) => {
//     e.preventDefault();
//     if (!cartItems.length) swal("Cart is empty", "Cart is empty", "error");
//     else if (userActive === null) {
//       swal("You must log in to buy!", "You must log in to buy!", "error");
//       navigate("/login");
//     } else {
//       fetch(`${process.env.REACT_APP_BACK}/pay/preference`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(preferencia.reverse()),
//       });
//       fetch(`${process.env.REACT_APP_BACK}/pay/create_preference`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(orderData),
//       })
//         .then(function (response) {
//           console.log("RESPONSE", response);
//           return response.json();
//         })

//         .then(function (preference) {
//           createCheckoutButton(preference.id);
//         })
//         .catch(function () {
//           alert("Unexpected error");
//         });
//     }
//   };

//   // Create preference when click on checkout button
//   const createCheckoutButton = (preferenceId) => {
//     // Initialize the checkout
//     mercadopago.checkout({
//       preference: {
//         id: preferenceId,
//       },
//       render: {
//         container: "#button-checkout", // Class name where the payment button will be displayed
//         label: "Pagar con MercadoPago", // Change the payment button text (optional)
//       },
//     });
//   };

//   const handleDeleteAllCart = async () => {
//     try {
//       // Hacer una petición DELETE al servidor para eliminar todo el contenido del carrito
//       await fetch(`${process.env.REACT_APP_BACK}/cart`, {
//         method: "DELETE",
//       });
//       // Actualizar el estado local del carrito para que se muestre vacío
//       setCartItems([]);
//       dispatch(update(true));
//       swal("Cart is empty", "Cart is empty", "error");
//     } catch (error) {
//       // Si hay un error, mostrar una alerta
//       swal("Error", "No se pudo eliminar el carrito", "error");
//     }
//   };

//   return (
//     <div className="ContainerCart">
//       <div className="botones_de_pago">
//         <div className="BotonCheckout">
//             <h2 className="h2">Detalle de tu Compra: ${total}</h2>
//           <button className="ButtonCart" onClick={handleCheckout}>
//             Finalizar Pedido
//           </button>
//           <div id="button-checkout"></div>
//         </div>
//       </div>

//       <div className="NavCart">
//         {cartItems.length === 0 ? (
//           <p className="EmptyP">Cart is empty</p>
//         ) : (
//           cartItems.map((item) => (
//             <div>
//               <ItemCart
//                 name={item.name}
//                 price={item.price}
//                 amount={item?.amount}
//                 image={item.image}
//                 prodId={item.prodId}
//                 key={item.id}
//                 product={products.find((prod) => prod.name === item.name)}
//                 handleDeleteAllCart={handleDeleteAllCart}
//               />
//             </div>
//           ))
//         )}
//       </div>
//       <div>
//       <button className='ButtonDeleteAll' onClick={handleDeleteAllCart}>Vaciar Carrito</button>
//       </div>
//     </div>
//   );
// }
