import React, {useState } from 'react';
import '../styles/Card.css';
import swal from 'sweetalert';
import { useDispatch, useSelector } from 'react-redux';
import { update } from '../redux/actions/CartActions';
import { AiOutlineShoppingCart } from 'react-icons/ai';

export default function AddToCart (item){

    const usuarioConectado = useSelector((state) => state.userActive);
    const [message, setMessage] = useState('');
    const dispatch =  useDispatch()
    
    const handleSubmit = (e) => {
        e.preventDefault();
        const newItem = {
            name: item.name,
            image: item.image,
            price: item.price,
            usuarioId: usuarioConectado.id, // UUID correcto
        };
        console.log("NEW ITEM", newItem);
        fetch(`${process.env.REACT_APP_BACK}/cart`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newItem),
        })
        .then((response) => response.json())
        .then((data) => swal('Success', "Cart Added!", 'success'))
        .catch((error) => console.error("Error:", error));
        dispatch(update(true));
    };

    
    // const handleSubmit = e => {
    //     e.preventDefault();
    //     const newItem = { name: item.name, image: item.image, price: item.price, usuario: usuarioConectado.id };        
    //     console.log("NEW ITEM" , newItem)
    //     fetch( `${process.env.REACT_APP_BACK}/cart`, {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify(newItem)
    //     })
    //     .then(response => response.json())
    //     .then(data => swal('Success', "Cart Added!", 'success'));
    //     dispatch(update(true))
    // };


    return (
        <div className='addToCartDiv'>
            <form onSubmit={handleSubmit}>
                <button className="ButtonC" type="submit"> <AiOutlineShoppingCart className="Cart" /></button>
                {message && <p className='ButtonMessage'>{message}</p>}
            </form>
        </div>
    );
}
// import React, { useState } from 'react';
// import '../styles/Card.css';
// import swal from 'sweetalert';
// import { useDispatch, useSelector } from 'react-redux';
// import { update } from '../redux/actions/CartActions';
// import { AiOutlineShoppingCart } from 'react-icons/ai';
// import { axiosClient } from "../herramientas/clienteAxios";

// export default function AddToCart( item ) {
//     const usuarioConectado = useSelector((state) => state.userActive);
//     console.log(usuarioConectado.email, "ADDTOCART");

//     const [message, setMessage] = useState('');
//     const dispatch = useDispatch();

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         // Estructura correcta del objeto a enviar
//         const newItem = {
//             name: item.name,
//             image: item.image,
//             price: item.price,
//             user: usuarioConectado.email // Asegúrate de enviar solo lo necesario
//         };
//         console.log("NEW ITEM", newItem);

//         try {
//             // Petición utilizando axios
//             const response = await axiosClient.post(`${process.env.REACT_APP_BACK}/cart`, newItem);

//             // Manejar la respuesta
//             if (response.status === 200) {
//                 swal('Success', 'Agregado a la Cesta!', 'success');
//                 dispatch(update(true)); // Actualiza el estado del carrito
//                 setMessage('Producto agregado con éxito'); // Actualiza el mensaje
//             } else {
//                 setMessage('Hubo un problema al agregar el producto');
//             }
//         } catch (error) {
//             console.error('Error al agregar al carrito:', error);
//             setMessage('Error al agregar al carrito');
//         }
//     };

//     return (
//         <div className="addToCartDiv">
//             <form onSubmit={handleSubmit}>
//                 <button className="ButtonC" type="submit">
//                     <AiOutlineShoppingCart className="Cart" />
//                 </button>
//                 {message && <p className="ButtonMessage">{message}</p>}
//             </form>
//         </div>
//     );
// }


// import React, {useState } from 'react';
// import '../styles/Card.css';
// import swal from 'sweetalert';
// import { useDispatch, useSelector } from 'react-redux';
// import { update } from '../redux/actions/CartActions';
// import { AiOutlineShoppingCart } from 'react-icons/ai';
// import {axiosClient} from "../herramientas/clienteAxios"


// export default function AddToCart (item){
//     const usuarioConectado = useSelector((state) => state.userActive);
//     console.log (usuarioConectado.email, "ADDTOCART")

//     const [message, setMessage] = useState('');
//     const dispatch =  useDispatch()

//     const handleSubmit = e => {
//         e.preventDefault();
//         const newItem = { name: item.name, image: item.image, price: item.price, usuarioConectado };        
//         console.log("NEW ITEM" , newItem)
//         const response = axiosClient(`${process.env.REACT_APP_BACK}/cart`, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: newItem
//         })
//         .then(response => response.json())
//         .then(data => swal('Success', "Agregado a la Cesta!", 'success'));
//         dispatch(update(true))
//     };


//     return (
//         <div className='addToCartDiv'>
//             <form onSubmit={handleSubmit}>
//                 <button className="ButtonC" type="submit"> <AiOutlineShoppingCart className="Cart" /></button>
//                 {message && <p className='ButtonMessage'>{message}</p>}
//             </form>
//         </div>
//     );
// }



