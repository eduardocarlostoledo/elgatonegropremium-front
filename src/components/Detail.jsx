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
  const usuarioConectado =
    useSelector((state) => state.users.userActive) || null;
  const productInCart = cart.find((p) => p.name === Name);

  // Unificar los efectos en uno solo
  useEffect(() => {
    dispatch(getProductDetail(Name));
    dispatch(getCart(usuarioConectado.id));

    if (updateReviews) {
      dispatch(getProductDetail(Name)); // Vuelve a obtener el detalle si se actualizan las reseñas
      setUpdateReviews(false);
    }
  }, [Name, dispatch, updateReviews]);

  if (!detail) {
    return <p>Cargando...</p>;
  }

  return (
    <div>
      <NavBar />

      <div className="detalleProducto">
        <div className="DetailC">
          <img className="ImageDetail" src={detail.image} alt="img" />

          <div className="DataDiv">
            <h1>{Name}</h1>
            <hr />
            <div className="TypeBrandDiv">
              <p>Calificación</p>
              <StarsCalification width={20} calif={detail.calification} />
              <p>
                <b>{detail.type}</b>
              </p>
              <p>
                <b>{detail.brand}</b>
              </p>
            </div>
            <div className="Detalle">
              <h2>
                <b>Precio: $ {detail.price}</b>
              </h2>
              <br />
              <p>{detail.description}</p>
              {detail.info_adicional && (
                <h6>
                  <b>Info Adicional:</b> {detail.info_adicional}
                </h6>
              )}
              <p>
                <strong>Stock:</strong> {detail.stock}
              </p>
            </div>

            {/* Mostrar botón de agregar al carrito o la cantidad si ya está en el carrito */}
            {!productInCart ? (
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
                <p>Cantidad: {productInCart?.amount || "No disponible"}</p>
              </div>
            )}
          </div>
        </div>

        <div className="ContainerR">
          {detail.reviews?.length > 0 ? (
            detail.reviews.map((r) => (
              <div key={r.id} className="ReviewListo">
                <div className="starR">
                  <StarsCalification width={10} calif={r.calification} />
                </div>
                <p>
                  <b>{r.nameUser + " " + r.lastnameUser + ": "}</b>
                </p>
                <p>{r.comment}</p>
              </div>
            ))
          ) : (
            <p>No hay Revisiones aún para este producto.</p>
          )}

          {usuarioConectado ? (
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
    </div>
  );
};

// import "../styles/Detail.css";
// import React, { useEffect, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { getProductDetail } from "../redux/slices/productSlice.js";
// import { getCart } from "../redux/slices/cartSlice.js";
// import { Link, useParams } from "react-router-dom";
// import AddToCart from "./AddToCart.jsx";
// import Review from "./Review.jsx";
// import StarsCalification from "./StarsCalification.jsx";
// import NavBar from "./NavBar.jsx";

// export const Detail = () => {
//   const { Name } = useParams();
//   const [updateReviews, setUpdateReviews] = useState(false);
//   const dispatch = useDispatch();

//   const cart = useSelector((state) => state.cart.items);
//   const detail = useSelector((state) => state.products.productDetail);
//   const product = cart.find((p) => p.name === Name);
//   const usuarioConectado = useSelector((state) => state.users.userActive) || null;

//   useEffect(() => {
//     dispatch(getProductDetail(Name));
//     setUpdateReviews(false);
//   }, [Name, dispatch]);

//   useEffect(() => {
//     dispatch(getCart());
//   }, [dispatch]);

//   useEffect(() => {
//     if (updateReviews) {
//       dispatch(getProductDetail(Name));
//       setUpdateReviews(false);
//     }
//   }, [updateReviews, Name, dispatch]);

//   if (!detail) {
//     return <p>Cargando...</p>;
//   }

//   return (
//     <div>
//       <NavBar/>
//       <div className="DetailC">
//         <img className="ImageDetail" src={detail.image} alt="img" />

//         <div className="DataDiv">
//           <h1>{Name}</h1>
//           <hr />
//           <div className="TypeBrandDiv">
//             <p>Calificación</p>
//             <StarsCalification width={20} calif={detail.calification} />
//             <p><b>{detail.type}</b></p>
//             <p><b>{detail.brand}</b></p>
//           </div>
//           <div className="Detalle">
//             <h2><b>Precio: $ {detail.price}</b></h2>
//             <br />
//             <p>{detail.description}</p>
//             {detail.info_adicional && (
//               <h6><b>Info Adicional:</b> {detail.info_adicional}</h6>
//             )}
//             <p><strong>Stock:</strong> {detail.stock}</p>
//           </div>

//           {!detail.inCart ? (
//             <div className="ButtonDetail">
//               <AddToCart
//                 name={Name}
//                 price={detail.price}
//                 image={detail.image}
//               />
//             </div>
//           ) : (
//             <div className="AmountDetail">
//               <p>Puedes agregar más antes del checkout</p>
//               <p>Este Producto se encuentra en tu carrito</p>
//               <p>Cantidad: {product?.amount || "No disponible"}</p>
//             </div>
//           )}
//         </div>
//       </div>

//       <div className="ContainerR">
//         {detail.reviews?.map((r) => (
//           <div key={r.id} className="ReviewListo">
//             <div className="starR">
//               <StarsCalification width={10} calif={r.calification} />
//             </div>
//             <p><b>{r.nameUser + " " + r.lastnameUser + ": "}</b></p>
//             <p>{r.comment}</p>
//           </div>
//         ))}
//         {usuarioConectado !== null ? (
//           <Review
//             setUpdateReviews={setUpdateReviews}
//             nameUser={usuarioConectado.name}
//             lastnameUser={usuarioConectado.lastname}
//             productId={detail.id}
//           />
//         ) : (
//           <p>Por favor, accede para comentar</p>
//         )}
//       </div>
//     </div>
//   );
// };
