import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import '../styles/AddToCart.css';
import swal from 'sweetalert';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, update } from '../redux/slices/cartSlice.js';
import { AiOutlineShoppingCart } from 'react-icons/ai';

export default function AddToCart({ item }) {

  const usuarioConectado = useSelector((state) => state.users.userActive);
  // console.log(usuarioConectado.id)
  // console.log("addtocart",item)
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const dispatch = useDispatch();

  // useEffect(()=> {
    
  // }, []) 

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!usuarioConectado) {
      swal({
        title: 'Error',
        text: 'Debes iniciar sesión para añadir productos al carrito.',
        icon: 'error',
        buttons: {
          cancel: 'Seguir navegando',
          confirm: 'Iniciar sesión'
        }
      }).then((value) => {
        if (value) {
          navigate("/login");
        }
      });
      return;
    }
  
    const newItem = {
      name: item.name,
      image: item.image,
      price: item.price,
      amount: 1, // Agregar una cantidad predeterminada
    };
  
      
    try {
      dispatch(addToCart({ product: newItem, user: usuarioConectado.id }));
      dispatch(update(true)); // Actualizar el estado del carrito
      console.log("Enviando a redux:", { product: newItem, user: usuarioConectado.id });
  
      swal('Éxito', 'Producto añadido al carrito', 'success');
      setMessage('Exito!');
    } catch (error) {
      console.error('Error al añadir al carrito:', error);
      setMessage('Ocurrió un error al añadir al carrito');
    }
  };

  return (
    <div className="addToCartDiv">
      <form onClick={handleSubmit}>
        <div className="addToCart" type="submit" disabled={!usuarioConectado}>
          <AiOutlineShoppingCart className="iconCarrito" />
        </div>
        {message && <p className="ButtonMessage">{message}</p>}
      </form>
    </div>
  );
}
