import React, { useState } from 'react';
import '../styles/AddToCart.css';
import swal from 'sweetalert';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, update } from '../redux/slices/cartSlice.js';
import { AiOutlineShoppingCart } from 'react-icons/ai';

export default function AddToCart({ item }) {
  const usuarioConectado = useSelector((state) => state.users.userActive);
  const [message, setMessage] = useState('');
  
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!usuarioConectado) {
      swal('Error', 'Debes iniciar sesión para añadir productos al carrito', 'error');
      return;
    }

    const newItem = {
      name: item.name,
      image: item.image,
      price: item.price,
      amount: 1, // Agregar una cantidad predeterminada
    };

    try {
      // Añadir el producto al carrito con la estructura correcta
      dispatch(addToCart({ product: newItem, user: usuarioConectado, amount : 1 }));
      dispatch(update(true)); // Actualizar el estado del carrito

      swal('Éxito', 'Producto añadido al carrito', 'success');
      setMessage('Producto añadido exitosamente');
    } catch (error) {
      console.error('Error al añadir al carrito:', error);
      setMessage('Ocurrió un error al añadir al carrito');
    }
  };

  return (
    <div className="addToCartDiv">
      <form onClick={handleSubmit}>
        <button className="addToCart" type="submit" disabled={!usuarioConectado}>
          <AiOutlineShoppingCart className="iconCarrito" />
        </button>
        {message && <p className="ButtonMessage">{message}</p>}
      </form>
    </div>
  );
}
