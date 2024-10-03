import React, { useEffect, useState } from "react";
import "../styles/Profile.css";
import { BiLogOutCircle } from "react-icons/bi";
import { FaPhone, FaCity } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { IoSettingsOutline } from "react-icons/io5";
import swal from 'sweetalert';
import { useNavigate, Link } from "react-router-dom";
import { BsSendDash } from "react-icons/bs";
import { Login } from "./Login.jsx";
import { putUserProfile, deleteUserLocalStorage, getAllUsers, changeNav, userActive } from '../redux/slices/userSlice.js';
import { getUpdate, update, getCart } from '../redux/slices/cartSlice.js';

export default function Profile() {
  const dispatch = useDispatch();
  //const up = useSelector(state => state.cart.items) || {} ;
  const usuarioConectado = useSelector((state) => state.users.userActive) || {};
  const isAuthenticated = useSelector((state) => state.users.userActive) || {};
  //console.log(isAuthenticated.status)
  const navigate = useNavigate();
  const [country, setCountrie] = useState({});
  const [Panel, setPanel] = useState(true);
  const [input, setInput] = useState({
    image: usuarioConectado.image ? usuarioConectado.image.secure_url : "",
    city: usuarioConectado.city ? usuarioConectado.city : "",
    id: usuarioConectado.id,
    phonenumber: usuarioConectado.phonenumber ? usuarioConectado.phonenumber : "",
    address: usuarioConectado.address ? usuarioConectado.address : "",
    country: usuarioConectado.country ? usuarioConectado.country : "",
    email: usuarioConectado.email,
  });

  // useEffect(() => {    
  //   dispatch(getUpdate());
  //   //dispatch(getAllUsers());
  //   dispatch(update(false));
  // }, []);

  useEffect(() => {
    if (usuarioConectado) {
      setInput({
        image: usuarioConectado.image ? usuarioConectado.image.secure_url : "",
        city: usuarioConectado.city ? usuarioConectado.city : "",
        id: usuarioConectado.id,
        phonenumber: usuarioConectado.phonenumber ? usuarioConectado.phonenumber : "",
        address: usuarioConectado.address ? usuarioConectado.address : "",
        country: usuarioConectado.country ? usuarioConectado.country : "",
        email: usuarioConectado.email,
      });
    }
  }, [usuarioConectado]);

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    });
  }

  const handleChangeImage = (e) => {
    setInput({ ...input, image: e.target.files[0] });
  };

  function CerrarSes(e) {
    e.preventDefault();
    dispatch(deleteUserLocalStorage());
    localStorage.setItem('isAuthenticated', "afuera");
    navigate("/Login");
  }

  function Cancel(e) {
    e.preventDefault();
    setPanel(true);
    setInput({
      image: usuarioConectado.image ? usuarioConectado.image : "",
      city: usuarioConectado.city ? usuarioConectado.city : "",
      id: usuarioConectado.id,
      phonenumber: usuarioConectado.phonenumber ? usuarioConectado.phonenumber : "",
      address: usuarioConectado.address ? usuarioConectado.address : "",
      country: usuarioConectado.country ? usuarioConectado.country : "",
      email: usuarioConectado.email,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const data = new FormData();
    Object.keys(input).forEach((key) => data.append(key, input[key]));
    dispatch(PutUserProfile(data, input.id));
    dispatch(update(true));
    swal("Success", 'User modified successfully', "success");
    setInput({ ...input });
    setPanel(true);
  }

  return (
    <div className="contenedor_profile">
      {isAuthenticated.status ? (
        <div className="Container">
          <div className="izquierda">
            <div className="containerImg">
              <img className="ImagenProfile" src={usuarioConectado.image ? usuarioConectado.image.secure_url : "https://cdn-icons-png.flaticon.com/512/3135/3135768.png"} alt="Profile" />
            </div>
            <div className="InfoUser">
              <div className="InfoUser-Name">
                <h3>{usuarioConectado.name} {usuarioConectado.admin && <span style={{ color: "green", fontSize: "11px", border: "0.01rem solid green", padding: "2px", borderRadius: "6px" }}>admin</span>}</h3>
              </div>
              <div>
                <FaCity className="icono" /> <span>{usuarioConectado.city || "Ciudad"}, Argentina</span>
              </div>
              <div>
                <FaPhone className="icono" /> <span>{usuarioConectado.phonenumber || "+54 9 11 2222 5555"}</span>
              </div>
              <div>
                <button className="logout" onClick={CerrarSes}>
                  <BiLogOutCircle /> Log out
                </button>
              </div>
            </div>
          </div>

          {Panel ? (
            <div className="derecha">
              <div className="hogar">
                <h1>{usuarioConectado.name} {usuarioConectado.lastname}</h1>
                <button onClick={() => setPanel(false)} className="hola"><IoSettingsOutline className="setting" /></button>
              </div>
              <h3><a href="https://login.live.com/" target="_blank" rel="noopener noreferrer">{usuarioConectado.email}</a></h3>
              <h4>Address: {usuarioConectado.address || "Street 151515"}</h4>

              {usuarioConectado.admin ? (
                <div style={{ marginTop: "15px" }}>
                  <Link to="/admin/users">
                    <button className="dashboard"><BsSendDash /> Dashboard Admin</button>
                  </Link>
                </div>
              ) : (
                <div style={{ marginTop: "15px" }}>
                  <h3><strong>My orders</strong></h3>
                  {Array.isArray(country) && country.length > 0 ? (
                    country.filter(e => e.buyer_email === usuarioConectado.email).map(e => (
                      <h6 key={e.id}>
                        Products: {e.product_description} <br />
                        Total price {e.total_order_price} $
                        <span style={{ color: "green", fontSize: "11px", border: "0.01rem solid green", padding: "2px", borderRadius: "6px" }}>{e.statusId}</span>
                        <hr />
                      </h6>
                    ))
                  ) : (
                    <p>No orders found</p>
                  )}
                </div>
              )}
            </div>
          ) : (
            <div className="modificar">
              <form onSubmit={handleSubmit}>
                <table>
                  <tbody>
                    <tr>
                      <td>Email:</td>
                      <td><input name="email" value={input.email} onChange={handleChange} type="email" /></td>
                    </tr>
                    <tr>
                      <td>Phone number:</td>
                      <td><input name="phonenumber" value={input.phonenumber} onChange={handleChange} type="text" /></td>
                    </tr>
                    <tr>
                      <td>Country:</td>
                      <td><input name="country" value={input.country} disabled /></td>
                    </tr>
                    <tr>
                      <td>City:</td>
                      <td>
                        <select name="city" onChange={handleChange}>
                          <option>{usuarioConectado.city || "Select City"}</option>
                          <option value="Buenos Aires">Buenos Aires</option>
                          <option value="Catamarca">Catamarca</option>
                          {/* Otros valores */}
                        </select>
                      </td>
                    </tr>
                    <tr>
                      <td>Address:</td>
                      <td><input name="address" value={input.address} onChange={handleChange} type="text" /></td>
                    </tr>
                    <tr>
                      <td>Image:</td>
                      <td><input name="image" type="file" onChange={handleChangeImage} /></td>
                    </tr>
                  </tbody>
                </table>
                <div className="sopapa">
                  <button className="cancel" onClick={Cancel}>Cancel</button>
                  <button className="modifi" type="submit">Modify</button>
                </div>
              </form>
            </div>
          )}
        </div>
      ) : (
        <div className="Container">
          <Login />
        </div>
      )}
    </div>
  );
}

// import React, { useEffect, useState } from "react"
// import "../styles/Profile.css"
// import { BiLogOutCircle } from "react-icons/bi"
// import { FaPhone, FaCity } from "react-icons/fa";
// import { useDispatch, useSelector } from "react-redux";
// import Card from 'react-bootstrap/Card';
// import { IoSettingsOutline } from "react-icons/io5"
// import Form from 'react-bootstrap/Form';
// import { PutUserProfile, deleteUserLocalStorage, getAllUsers, ChangeNav } from '../redux/actions/UsersActions';
// import { getUpdate, update } from '../redux/actions/CartActions';
// import swal from 'sweetalert';
// import { useNavigate, Link, Navigate } from "react-router-dom"
// import { BsSendDash } from "react-icons/bs"
// import { Login } from "./Login";

// export default function Profile() {

//   const dispatch = useDispatch()
//   const up = useSelector(state => state.update)
//   const usuarioConectado = useSelector((state) => state.usuarioConectado);
//   const isAuthenticated = useSelector((state) => state.ChangeNav)
//   //console.log("state.ChangeNav IS AUTENTICATED PROFILE", isAuthenticated)
//   const navigate = useNavigate();
//   const [country, setCountrie] = useState({})
//   const [Panel, setPanel] = useState(true);
//   const [input, setInput] = useState({
//     image: usuarioConectado.image ? usuarioConectado.image.secure_url : "",
//     city: usuarioConectado.city ? usuarioConectado.city : "",
//     id: usuarioConectado.id,
//     phonenumber: usuarioConectado.phonenumber ? usuarioConectado.phonenumber : "",
//     address: usuarioConectado.address ? usuarioConectado.address : "",
//     country: usuarioConectado.country ? usuarioConectado.country : "",
//     email: usuarioConectado.email,
//   });

//   useEffect(() => {
//     dispatch(getUpdate());
//     dispatch(getAllUsers());
//     dispatch(update(false));
//   }, [up])

//   useEffect(() => {
//     let isMounted = true;

//     fetch(`${import.meta.env.VITE_APP_BACK}/order`)
//       .then((res) => {
//         if (!res.ok) throw new Error("Error al obtener los datos");
//         return res.json();
//       })
//       .then((data) => {
//         if (isMounted) setCountrie(data);
//       })
//       .catch((error) => {
//         console.error("Error fetching order data:", error);
//         if (isMounted) setCountrie([]); // Esto ya maneja el error
//       });

//     return () => {
//       isMounted = false; // Solo limpia la bandera
//     };
//   }, []);

//   useEffect(() => {
//     if (usuarioConectado) {
//       setInput({
//         image: usuarioConectado.image ? usuarioConectado.image.secure_url : "",
//         city: usuarioConectado.city ? usuarioConectado.city : "",
//         id: usuarioConectado.id,
//         phonenumber: usuarioConectado.phonenumber ? usuarioConectado.phonenumber : "",
//         address: usuarioConectado.address ? usuarioConectado.address : "",
//         country: usuarioConectado.country ? usuarioConectado.country : "",
//         email: usuarioConectado.email,
//       });

//     }
//   }, [usuarioConectado]);

//   function handleChange(e) {
//     setInput({
//       ...input,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleChangeImage = (e) => {
//     setInput({ ...input, image: e.target.files[0] })
//   }

//   function CerrarSes(e) {
//     e.preventDefault();
//     dispatch(deleteUserLocalStorage());
//     localStorage.setItem('isAuthenticated', "afuera");
//     navigate("/Login");
//   }

//   function Cancel(e) {
//     e.preventDefault();
//     setPanel(true)
//     setInput({
//       image: usuarioConectado.image ? usuarioConectado.image : "",
//       city: usuarioConectado.city ? usuarioConectado.city : "",
//       id: usuarioConectado.id,
//       phonenumber: usuarioConectado.phonenumber ? usuarioConectado.phonenumber : "",
//       address: usuarioConectado.address ? usuarioConectado.address : "",
//       country: usuarioConectado.country ? usuarioConectado.country : "",
//       email: usuarioConectado.email,
//     })
//   }

//   function handleSubmit(e) {
//     e.preventDefault();
//     const data = new FormData();
//     Object.keys(input).forEach((key) => data.append(key, input[key]));
//     dispatch(PutUserProfile(data, input.id))
//     dispatch(update(true));
//     swal("success", 'User modified successfully', "success")
//     setInput({
//       ...input
//     });
//     setPanel(true)
//   }

//   return (
//     <div className="contenedor_profile">
//       { !isAuthenticated ? <div className="Container">
//         <div className="izquierda">
//           <div className="containerImg">
//             <Card.Img className="ImagenProfile" variant="top" src={usuarioConectado.image ? usuarioConectado.image.secure_url : "https://cdn-icons-png.flaticon.com/512/3135/3135768.png"} />
//           </div>
//           <div className="InfoUser">
//             <div className="InfoUser-Name">
//               <h3>{usuarioConectado.name} {usuarioConectado.admin ? <span style={{ color: "green", fontSize: "11px", border: "0.01rem solid green", padding: "2px", borderRadius: "6px" }}>admin</span> : ""}</h3>
//             </div>
//             <div>
//               <FaCity className="icono"></FaCity><span>{usuarioConectado.city ? usuarioConectado.city : "Ciudad"}, Argentina</ span>
//             </div>
//             <div>
//               <FaPhone className="icono"></FaPhone><span>{usuarioConectado.phonenumber ? usuarioConectado.phonenumber : "+54 9 11 2222 5555"}</span>
//             </div>
//             <div>
//               <button className="logout" onClick={(e) => CerrarSes(e)}>
//                 <BiLogOutCircle></BiLogOutCircle > Log out
//               </button>
//             </div>
//           </div>
//         </div>

//         {Panel ? <div className="derecha">
//           <div className="hogar">
//             <h1>{usuarioConectado.name} {usuarioConectado.lastname}</h1>
//             <button onClick={() => setPanel(false)} className="hola"><IoSettingsOutline className="setting"></IoSettingsOutline></button>
//           </div>
//           <h3><a href="https://login.live.com/" target="_blank" rel="noopener noreferrer">{usuarioConectado.email}</a></h3>
//           <h4>Address: {usuarioConectado.address ? usuarioConectado.address : "Street 151515"}</h4>
//           {
//             usuarioConectado.admin ? <div style={{ marginTop: "15px" }}>
//               <div>
//                 <Link to="/admin/users"><button className="dashboard"><span><BsSendDash /> Dashboard Admin</span></button></Link>
//               </div>
//             </div>
//               :
//               <div style={{ marginTop: "15px" }}>
//                 <h3><strong>My orders</strong></h3>

//                 {/* {country.length > 0 && country?.map((e, index) => {
//                     if(e.buyer_email === usuarioConectado.email ) {
//                        return (<h6 key={index}>Products: {e.product_description} <br/> Total price {e.total_order_price} $ <span style={{color: "green", fontSize: "11px", border: "0.01rem solid green", padding: "2px", borderRadius: "6px"}}>{e.statusId}</span><hr/></h6>)
//                     }
//                   })
//               } */}

//                 {Array.isArray(country) && country.length > 0 ? (
//                   country
//                     .filter(e => e.buyer_email === usuarioConectado.email)
//                     .map(e => (
//                       <h6 key={e.id}>
//                         Products: {e.product_description} <br />
//                         Total price {e.total_order_price} $
//                         <span
//                           style={{
//                             color: "green",
//                             fontSize: "11px",
//                             border: "0.01rem solid green",
//                             padding: "2px",
//                             borderRadius: "6px"
//                           }}
//                         >
//                           {e.statusId}
//                         </span>
//                         <hr />
//                       </h6>
//                     ))
//                 ) : (
//                   <p>No orders found</p>
//                 )}



//               </div>
//           }

//         </div>
//           :
//           <div className="modificar">
//             <Form>
//               <div className="prueba">
//                 <Form.Group className="mb-3" controlId="formBasicEmail">
//                   <Form.Label>Email</Form.Label>
//                   <Form.Control name='email' value={input.email} onChange={e => handleChange(e)} className="inputs" type="email" placeholder="Enter email" />
//                 </Form.Group>
//                 <Form.Group className="mb-3" controlId="Phonenumber">
//                   <Form.Label>Phonenumber</Form.Label>
//                   <Form.Control name='phonenumber' value={input.phonenumber} onChange={e => handleChange(e)} className="inputs" type="text" placeholder="Enter phonenumber" />
//                 </Form.Group>
//               </div>

//               <div className="prueba">
//                 <Form.Group className="mb-3" controlId="Country">
//                   <Form.Label>Country</Form.Label>
//                   <Form.Control style={{ userSelect: "none", border: "0.01rem solid grey", backgroundColor: "white" }} name='country' value={input.country} onChange={e => handleChange(e)} className="inputs" disabled={true} type="text" placeholder="Enter country" />
//                 </Form.Group>

//                 <Form.Group className="mb-3" controlId="City">
//                   <Form.Label>City</Form.Label>
//                   <Form.Select style={{ border: "0.01rem solid grey", width: "203px" }} name="city" onChange={e => handleChange(e)} aria-label="Default select example">
//                     <option> {usuarioConectado.city ? usuarioConectado.city : "Select City"}</option>
//                     <option value="Buenos Aires">Buenos Aires</option>
//                     <option value="Catamarca">Catamarca</option>
//                     <option value="Chaco">Chaco</option>
//                     <option value="Chubut">Chubut</option>
//                     <option value="CABA">Ciudad Autónoma de Buenos Aires</option>
//                     <option value="Córdoba">Córdoba</option>
//                     <option value="Corrientes">Corrientes</option>
//                     <option value="Entre Ríos">Entre Ríos</option>
//                     <option value="Formosa">Formosa</option>
//                     <option value="Jujuy">Jujuy</option>
//                     <option value="La Pampa">La Pampa</option>
//                     <option value="La Rioja">La Rioja</option>
//                     <option value="Mendoza">Mendoza</option>
//                     <option value="Misiones">Misiones</option>
//                     <option value="Neuquén">Neuquén</option>
//                     <option value="Río Negro">Río Negro</option>
//                     <option value="Salta">Salta</option>
//                     <option value="San Juan">San Juan</option>
//                     <option value="San Luis">San Luis</option>
//                     <option value="Santa Cruz">Santa Cruz</option>
//                     <option value="Santa Fe">Santa Fe</option>
//                     <option value="Santiago del Estero">Santiago del Estero</option>
//                     <option value="Tierra del Fuego">Tierra del Fuego</option>
//                     <option value="Tucumán">Tucumán</option>
//                   </Form.Select>
//                 </Form.Group>
//               </div>
//               <div className="prueba">
//                 <Form.Group className="mb-3" controlId="Address">
//                   <Form.Label>Address</Form.Label>
//                   <Form.Control name='address' value={input.address} onChange={e => handleChange(e)} className="inputs" type="text" placeholder="Enter address" />
//                 </Form.Group>
//                 <Form.Group className="mb-3" controlId="Imagen">
//                   <Form.Label>Imagen URL</Form.Label>
//                   <Form.Control name='image' onChange={e => handleChangeImage(e)} className="inputs" type="file" placeholder="Enter URL image" />
//                 </Form.Group>
//               </div>
//               <div className="sopapa">
//                 <div>
//                   <button className="cancel" onClick={(e) => Cancel(e)}>
//                     Cancel
//                   </button>
//                 </div>
//                 <div>
//                   <button className="modifi" onClick={(e) => handleSubmit(e)} >
//                     Modify
//                   </button>
//                 </div>
//               </div>
//             </Form>
//           </div>
//         }
//       </div>
//         : 
//         <div className="Container">
// <Login/>
// </div>
//       }


//     </div>
//   )
// }

