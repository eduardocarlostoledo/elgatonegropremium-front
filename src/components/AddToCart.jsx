import React, { useState } from 'react';
import '../styles/Card.css';
import swal from 'sweetalert';
import { useDispatch } from 'react-redux';
import { update } from '../redux/actions/CartActions';
import { AiOutlineShoppingCart } from 'react-icons/ai';

export default function AddToCart(item) {
    // const [message, setMessage] = useState(''); // No se utiliza, considera eliminarlo
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        const newItem = { name: item.name, image: item.image, price: item.price };
        // //console.log("NEW ITEM", newItem); // Puedes descomentar si es necesario

        fetch(`${process.env.REACT_APP_BACK}/cart`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newItem),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Error al agregar a la cesta');
                }
                return response.json();
            })
            .then((data) => {
                swal('Éxito', 'Agregado a la Cesta!', 'success');
                dispatch(update(true));
            })
            .catch((error) => {
                console.error('Error:', error.message);
                swal('Error', 'Hubo un problema al agregar a la cesta', 'error');
            });
    };

    return (
        <div className='addToCartDiv'>
            <form onSubmit={handleSubmit}>
                <button className='ButtonC' type='submit'>
                    <AiOutlineShoppingCart className='Cart' />
                </button>
                {/* {message && <p className='ButtonMessage'>{message}</p>} */}
            </form>
        </div>
    );
}

// import React, {useState } from 'react';
// import '../styles/Card.css';
// import swal from 'sweetalert';
// import { useDispatch } from 'react-redux';
// import { update } from '../redux/actions/CartActions';
// import { AiOutlineShoppingCart } from 'react-icons/ai';

// export default function AddToCart (item){

//     const [message, setMessage] = useState('');
//     const dispatch =  useDispatch()

//     const handleSubmit = e => {
//         e.preventDefault();
//         const newItem = { name: item.name, image: item.image, price: item.price };        
//         //console.log("NEW ITEM" , newItem)
//         fetch(`${process.env.REACT_APP_BACK}/cart`, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(newItem)
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
