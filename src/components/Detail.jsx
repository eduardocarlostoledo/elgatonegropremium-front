import "../styles/Detail.css";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProductDetail } from "../redux/slices/productSlice.js";
import { getCart } from "../redux/slices/cartSlice.js";
import { Link, useParams } from "react-router-dom";
import AddToCart from "./AddToCart.jsx";
import Review from "./Review.jsx";
import StarsCalification from "./StarsCalification.jsx";
import NavBar from "./NavBar.jsx";

export const Detail = () => {
  const { Name } = useParams();
  const [updateReviews, setUpdateReviews] = useState(false);
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart.items);
  const detail = useSelector((state) => state.products.productDetail);
  const product = cart.find((p) => p.name === Name);
  const usuarioConectado = useSelector((state) => state.users.userActive) || null;

  useEffect(() => {
    dispatch(getProductDetail(Name));
    setUpdateReviews(false);
  }, [Name, dispatch]);

  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);

  useEffect(() => {
    if (updateReviews) {
      dispatch(getProductDetail(Name));
      setUpdateReviews(false);
    }
  }, [updateReviews, Name, dispatch]);

  if (!detail) {
    return <p>Cargando...</p>;
  }

  return (
    <div>
      <NavBar/>
      <div className="DetailC">
        <img className="ImageDetail" src={detail.image} alt="img" />

        <div className="DataDiv">
          <h1>{Name}</h1>
          <hr />
          <div className="TypeBrandDiv">
            <p>Calificación</p>
            <StarsCalification width={20} calif={detail.calification} />
            <p><b>{detail.type}</b></p>
            <p><b>{detail.brand}</b></p>
          </div>
          <div className="Detalle">
            <h2><b>Precio: $ {detail.price}</b></h2>
            <br />
            <p>{detail.description}</p>
            {detail.info_adicional && (
              <h6><b>Info Adicional:</b> {detail.info_adicional}</h6>
            )}
            <p><strong>Stock:</strong> {detail.stock}</p>
          </div>

          {!detail.inCart ? (
            <div className="ButtonDetail">
              <AddToCart
                name={Name}
                price={detail.price}
                image={detail.image}
              />
            </div>
          ) : (
            <div className="AmountDetail">
              <p>Puedes agregar más antes del checkout</p>
              <p>Este Producto se encuentra en tu carrito</p>
              <p>Cantidad: {product?.amount || "No disponible"}</p>
            </div>
          )}
        </div>
      </div>

      <div className="ContainerR">
        {detail.reviews?.map((r) => (
          <div key={r.id} className="ReviewListo">
            <div className="starR">
              <StarsCalification width={10} calif={r.calification} />
            </div>
            <p><b>{r.nameUser + " " + r.lastnameUser + ": "}</b></p>
            <p>{r.comment}</p>
          </div>
        ))}
        {usuarioConectado !== null ? (
          <Review
            setUpdateReviews={setUpdateReviews}
            nameUser={usuarioConectado.name}
            lastnameUser={usuarioConectado.lastname}
            productId={detail.id}
          />
        ) : (
          <p>Por favor, accede para comentar</p>
        )}
      </div>
    </div>
  );
};

// import "../styles/Detail.css";
// import React from "react";
// import { useEffect, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { getProductDetail } from "../redux/slices/productSlice.js";
// import { getCart } from "../redux/slices/cartSlice.js";
// import { userActive } from "../redux/slices/userSlice.js";
// import { Link, useParams } from "react-router-dom";
// import AddToCart from "./AddToCart.jsx";
// import Review from "./Review.jsx";
// import StarsCalification from "./StarsCalification.jsx";



// export const Detail = () => {
//   const { Name } = useParams();
//   console.log(Name, "DETAIL")
//   const [updateReviews, setUpdateReviews] = useState(false);

//   const dispatch = useDispatch();

//   const cart = useSelector((state) => state.cart.items);
//   const detail = useSelector((state) => state.products.productDetail);
//   console.log(detail, "detalle de detail del state")
//   const product = cart.find((p) => p.name === Name);

//   const usuarioConectado = useSelector((state) => state.users.userActive) || null
              

//   useEffect(() => {
//     dispatch(getProductDetail(Name)); 
//     setUpdateReviews(false)   
//   }, []);


//   useEffect(() => {
//     //console.log(usuarioConectado)
//     dispatch(getCart());    
//   }, []);
  
//   //console.log(detail);
  


//   return (
//     <div>
//         <div className="Link">
//           <Link to="/Products">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               width="30"
//               height="30"
//               fill="#ffffff"
//               className="bi-house"
//               viewBox="0 0 16 16"
//             >
//               <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.707 1.5ZM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5 5 5Z" />
//             </svg>
//             <>Tienda</>
//           </Link>
//         </div>
       
//         <div className="DetailC">
             
//         <img className="ImageDetail" src={detail.image} alt='img'/>
        
              
//         <div className="DataDiv">
//           <h1>{Name}</h1>
//           <hr />
//           <div className="TypeBrandDiv">
//           <p>Calificación</p>
//           <StarsCalification width={20} calif={detail.calification}/>
//               <p><b>{detail.type}</b></p>
//               <p><b>{detail.brand}</b></p>
//           </div>
//           <div className="Detalle">
//             <h2><b>Precio: $ {detail.price}</b></h2>
//             <br />
//             <p>{detail.description}</p>
//             {detail.info_adicional && (<h6><b>Info Adicional:</b> {detail.info_adicional}</h6>)}
//             <p><strong>Stock:</strong> {detail.stock}</p>
//           </div>

        
//             {!detail.inCart?
//             <div className="ButtonDetail">

//               <AddToCart 
//               name={Name} 
//               price={detail.price}
//               image={detail.image} 
//               />
//             </div>
//             : <div className="AmountDetail">
//                               <p>Puedes agregar más antes del checkout</p>

//                 <p>Este Producto se encuentra en tu carrito</p>
//                 <p>Cantidad: {product?.amount}</p> 
//                 {/* EL ? EVITA QUE ROMPA LA WEB DE DETAIL POST DELETE CAR POST PAYMENT */}
//               </div>
//               }
        

//         </div>
//         </div>
//         <div className="ContainerR">
//           {detail.reviews?.map((r)=>(
//             <div className="ReviewListo">
//               <div className="starR">
//                 <StarsCalification width={10} calif={r.calification}/>
//               </div>
//               <p><b>{r.nameUser + " " +r.lastnameUser + ": "}</b></p>
//               <p>{r.comment}</p>
//             </div>
//           )) }
//           {usuarioConectado!==null?
//             <Review setUpdateReviews={setUpdateReviews} nameUser={usuarioConectado.name} lastnameUser={usuarioConectado.lastname} productId={detail.id}/>
//             :<p>Por favor, accede para comentar</p>
//           }
//         </div>
//     </div>
//   );
// };