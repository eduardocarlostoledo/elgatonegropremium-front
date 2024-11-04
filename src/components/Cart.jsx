import React, { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import mercadopago from "../components/mercadopago/mercadopago.js";
import "../styles/Cart.css";
import swal from "sweetalert";
import ItemCart from "./ItemCart.jsx";
import { useDispatch, useSelector } from "react-redux";
import { getCart, deleteAllFromCart } from "../redux/slices/cartSlice.js";

export default function Cart() {
  const up = useSelector((state) => state.cart.update);  
  console.log("UP", up)  
  
  const [isButtonVisible, setIsButtonVisible] = useState(true); // Para controlar la visibilidad del botón
  const dispatch = useDispatch();  
  const navigate = useNavigate();
  const products = useSelector((state) => state.products.allProducts);
  const userActive = useSelector((state) => state.users.userActive);
const fetchData = useSelector((state)=> state.cart.items) 

console.log("FETCHDATA", fetchData)

  // const fetchData = useCallback(() => {
  //   fetch(`${import.meta.env.VITE_APP_BACK}/cart`)
  //     .then((response) => response.json())
  //     .then((data) => setfetchData([...data]))
  //     .catch(() => swal("Cart is empty", "Cart is empty", "error"));
  // }, []);

  const total = fetchData.flatMap(data => data.cartProducts)
   .reduce((acc, item) => acc + item.price * item.amount, 0)
   .toFixed(1) || null;


  const preferencia = fetchData.map((item) => ({
    product_description: item.name,
    product_name: item.name,
    product_image: item.image,
    product_amount: item.amount,
    product_unit_price: item.price,
    prodId: item.prodId,
  }));
  
  const description = fetchData.map((item) => item.name) || null;

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
    if (!fetchData.length) {
      swal("Cart is empty", "Cart is empty", "error");
    } else if (userActive === null) {
      swal("You must log in to buy!", "You must log in to buy!", "error");
      navigate("/login");
    } else {
      setIsButtonVisible(false); // Ocultar el botón cuando se hace clic

      fetch(`${import.meta.env.VITE_APP_BACK}/pay/preference`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(preferencia.reverse()),
      })
        .then((response) => response.json())
        .then((preference) => {
          createCheckoutButton(preference.id);
        })
        .catch(() => {
          swal("Unexpected error", "Error creating payment preference", "error");
        });
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
      console.log(userActive.id)
      dispatch(deleteAllFromCart(userActive.id))
      //dispatch(update(true));
      swal("Cart is empty", "Cart is empty", "success");
    } catch (error) {
      console.error("Error deleting cart:", error);
      swal("Error", "No se pudo eliminar el carrito", "error");
    }
  };

  return (
    <div className="carritoCompras">
      {fetchData.length === 0 ? (
        <div>
          <p className="EmptyP">Carrito Vacío</p>
          <Link to="/Products">
            <button className="buttonIrTienda">Ir a la Tienda</button>
          </Link>
        </div>
      ) : (
        <div className="cart-grid"> {/* Contenedor de las tarjetas */}
         
          {fetchData.flatMap(data => data.cartProducts).map((item) => (

            <div key={item.id} className="cart-card"> {/* Clase para las tarjetas */}
              <ItemCart
                name={item.name}
                price={item.price}
                amount={item?.amount}
                image={item.image.secure_url}
                prodId={item.prodId}
                product={products.find((prod) => prod.name === item.name)}
              />
            </div>
          ))}
        </div>
      )}
      <div className="botones_de_pago">
        <div className="BotonCheckout">
          {/* <h2 className="h2">Total: ${total}</h2> */}
          {isButtonVisible && fetchData.length !== 0 && (
            <button className="ButtonCart" onClick={handleCheckout}>
              Finalizar Pedido
            </button>
          )}
          <div id="button-checkout"></div>
        </div>
      </div>
      <button className="ButtonDeleteAll" onClick={handleDeleteAllCart}>
        Vaciar Carrito
      </button>
    </div>
  );
}
