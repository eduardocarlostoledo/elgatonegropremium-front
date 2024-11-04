import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import swal from 'sweetalert';
//import jwt_decode from "jwt-decode";
//import { decode as jwt_decode } from "jwt-decode";
import * as jwt_decode from "jwt-decode";
import { loginUser, userActive, changeNav, postUsersGoogle, loginGoogle } from '../redux/slices/userSlice.js';
import styles from "../styles/Login.module.css";
import axiosClient from "../herramientas/clienteAxios";

function validate(input) {
    let errors = {};
    const regexEmail = /^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/g;

    if (!input.password) {
        errors.password = "Password is required";
    }
    if (input.password.length > 12) {
        errors.password = "Max 12 caracteres";
    }
    if (input.password.length < 5) {
        errors.password = "Min 5 caracteres";
    }
    if (input.email && !regexEmail.test(input.email)) {
        errors.email = "Insert valid email";
    }
    if (!input.email) {
        errors.email = "Email is required";
    }
    return errors;
}

export const Login = () => {
    const [example, setExample] = useState(false);
    const [errors, setErrors] = useState({});
    const [errormsg, setErrormsg] = useState(false);
    const [input, setInput] = useState({
        email: "",
        password: "",
    });
    const [infoGoogle, setInfoGoogle] = useState({
        email: "",
        lastname: "",
        name: "",
        image: "",
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();

    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        });
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }));
    }

    const viewAlert = async () => {
        const googleUser = await dispatch(postUsersGoogle(infoGoogle));
        const email = { email: infoGoogle.email };
        const userResponse = await dispatch(loginGoogle(email));

        if (userResponse.success) {
            const userData = userResponse.data;
            if (userData.status) {
                dispatch(userActive(userResponse));
                dispatch(changeNav());
                localStorage.setItem('isAuthenticated', "On");
                navigate(userData.admin ? "/admin/users" : "/Profile");
            } else {
                swal("User Banned", "Your account has been suspended", "error");
            }
        }
    }

    function handleGoogleResponse(response) {
        const userObject = jwt_decode(response.credential);
        setInfoGoogle({
            email: userObject.email,
            lastname: userObject.family_name,
            name: userObject.given_name,
            image: userObject.picture
        });

        swal({
            title: "Login with Google?",
            text: "By logging in, you allow access to your profile data (name, email, picture)",
            icon: "warning",
            buttons: ["No", "Yes"]
        }).then(response => {
            if (response) {
                setExample(true);
            }
        });
    }

    useEffect(() => {
        /* global google */
        google.accounts.id.initialize({
            client_id: `${import.meta.env.VITE_APP_YOUR_GOOGLE_CLIENT_ID}`,
            callback: handleGoogleResponse
        });
        google.accounts.id.renderButton(
            document.getElementById("signInDiv"),
            { theme: "outline", size: "large" }
        );
    }, []);

    async function handleSubmit(e) {
        e.preventDefault();
        if (!input.email || !input.password) {
            return swal("Invalid", "Missing required fields!", "error");
        }

        // const response = await axiosClient.post("/users/login", input);
        const response = await dispatch(loginUser(input))
        //console.log("response login", response)
        if (response.payload.success && response.payload.msg === "Login successful" ) {
            //console.log("condiciones aceptadas")            
            if (response.payload.user.status) {
                //console.log("user data", response.payload.user.token)

                dispatch(userActive(response.payload.user));
                dispatch(changeNav());
                localStorage.setItem('isAuthenticated', "On");
                localStorage.setItem('token', response.payload.user.token);
                navigate(response.payload.user.admin ? "/admin/users" : "/Profile");

            } else {
                swal("User Banned", "Your account has been suspended", "error");
            }
        } else {
            setErrormsg(true);
            setTimeout(() => setErrormsg(false), 5000);
        }
    }

    return (
        <div className={styles.ContainerAllForm}>
            <form className={styles.ContainerAll} onSubmit={handleSubmit}>
                <div className={styles.register}>
                    <h2>Login</h2>
                </div>
                <div className={styles.pack}>
                    <label>Email address</label>
                    <input
                        name="email"
                        value={input.email}
                        onChange={handleChange}
                        className={styles.inputs}
                        type="email"
                        placeholder="Enter email"
                    />
                </div>
                <div className={styles.pack}>
                    <label>Password</label>
                    <input
                        name="password"
                        value={input.password}
                        onChange={handleChange}
                        className={styles.inputs}
                        type="password"
                        placeholder="Password"
                    />
                </div>
                {errormsg && <small className={styles.msgerr}>Invalid email or password</small>}
                <div className={styles.containerBtn}>
                    <button className={styles.btnR} type="submit">Login</button>
                </div>
                <div style={{ marginLeft: "150px", color: "rgb(0, 96, 151)", cursor: "pointer" }}>
                    <Link to="/changePass">I forgot my password</Link>
                </div>
                <div className={styles.down}>
                    <h5>Don't have an account? <Link to="/Register"><button className={styles.here}>Register</button></Link></h5>
                </div>
                <div className={styles.containerBtn}>
                    {!infoGoogle.email && <div id="signInDiv"></div>}
                    {example && infoGoogle.email && <div onClick={viewAlert}><strong>Logging in...</strong></div>}
                </div>
            </form>
        </div>
    );
}

// import { useEffect, useState } from "react";
// import { useDispatch } from "react-redux";
// import { useNavigate, Link } from "react-router-dom";
// import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form';
// import swal from 'sweetalert';
// import jwt_decode from "jwt-decode";
// import { userLogin, userActive, ChangeNav, postUsersGoogle, loginGoogle } from '../redux/actions/UsersActions';
// import styles from "../styles/Login.module.css";

// function validate(input) {
//     let errors = {};
//     const regexEmail = /^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/g;

//     if (!input.password) {
//         errors.password = "Password is required";
//     }
//     if (input.password.length > 12) {
//         errors.password = "Max 12 caracteres";
//     }
//     if (input.password.length < 5) {
//         errors.password = "Min 5 caracteres";
//     }
//     if (input.email && !regexEmail.test(input.email)) {
//         errors.email = "Insert valid email";
//     }
//     if (!input.email) {
//         errors.email = "Email is required";
//     }
//     return errors;
// }

// export const Login = () => {
//     const [example, setExample] = useState(false);
//     const [errors, setErrors] = useState({});
//     const [errormsg, setErrormsg] = useState(false);
//     const [input, setInput] = useState({
//         email: "",
//         password: "",
//     });
//     const [infoGoogle, setInfoGoogle] = useState({
//         email: "",
//         lastname: "",
//         name: "",
//         image: "",
//     });

//     const dispatch = useDispatch();
//     const navigate = useNavigate();

//     function handleChange(e) {
//         setInput({
//             ...input,
//             [e.target.name]: e.target.value
//         });
//         setErrors(validate({
//             ...input,
//             [e.target.name]: e.target.value
//         }));
//     }

//     const viewAlert = async () => {
//         const googleUser = await dispatch(postUsersGoogle(infoGoogle));
//         const email = { email: infoGoogle.email };
//         const userResponse = await dispatch(loginGoogle(email));

//         if (userResponse.success) {
//             const userData = userResponse.data;
//             if (userData.status) {
//                 dispatch(userActive(userResponse));
//                 dispatch(ChangeNav());
//                 localStorage.setItem('isAuthenticated', "On");
//                 navigate(userData.admin ? "/admin/users" : "/Profile");
//             } else {
//                 swal("User Banned", "Your account has been suspended", "error");
//             }
//         }
//     }

//     function handleGoogleResponse(response) {
//         const userObject = jwt_decode(response.credential);
//         setInfoGoogle({
//             email: userObject.email,
//             lastname: userObject.family_name,
//             name: userObject.given_name,
//             image: userObject.picture
//         });

//         swal({
//             title: "Login with Google?",
//             text: "By logging in, you allow access to your profile data (name, email, picture)",
//             icon: "warning",
//             buttons: ["No", "Yes"]
//         }).then(response => {
//             if (response) {
//                 setExample(true);
//             }
//         });
//     }

//     useEffect(() => {
//         /* global google */
//         google.accounts.id.initialize({
//             client_id: `${import.meta.env.VITE_APP_YOUR_GOOGLE_CLIENT_ID}`,
//             callback: handleGoogleResponse
//         });
//         google.accounts.id.renderButton(
//             document.getElementById("signInDiv"),
//             { theme: "outline", size: "large" }
//         );
//     }, []);

//     async function handleSubmit(e) {
//         e.preventDefault();
//         if (!input.email || !input.password) {
//             return swal("Invalid", "Missing required fields!", "error");
//         }

//         const response = await dispatch(userLogin(input));
//         if (response.data.success) {
//             const userData = response.data.user;
//             if (userData.status) {
//                 dispatch(userActive(userData));
//                 dispatch(ChangeNav());
//                 localStorage.setItem('isAuthenticated', "On");
//                 navigate(userData.admin ? "/admin/users" : "/Profile");
//             } else {
//                 swal("User Banned", "Your account has been suspended", "error");
//             }
//         } else {
//             setErrormsg(true);
//             setTimeout(() => setErrormsg(false), 5000);
//         }
//     }

//     return (
//         <div className={styles.ContainerAllForm}>
//             <Form className={styles.ContainerAll} onSubmit={handleSubmit}>
//                 <div className={styles.register}>
//                     <h2>Login</h2>
//                 </div>
//                 <Form.Group className={styles.pack} controlId="formBasicEmail">
//                     <Form.Label>Email address</Form.Label>
//                     <Form.Control name="email" value={input.email} onChange={handleChange} className={styles.inputs} type="email" placeholder="Enter email" />
//                 </Form.Group>
//                 <Form.Group className={styles.pack} controlId="formBasicPassword">
//                     <Form.Label>Password</Form.Label>
//                     <Form.Control name="password" value={input.password} onChange={handleChange} className={styles.inputs} type="password" placeholder="Password" />
//                 </Form.Group>
//                 {errormsg && <small className={styles.msgerr}>Invalid email or password</small>}
//                 <div className={styles.containerBtn}>
//                     <Button className={styles.btnR} type="submit">Login</Button>
//                 </div>
//                 <div style={{ marginLeft: "150px", color: "rgb(0, 96, 151)", cursor: "pointer" }}>
//                     <Link to="/changePass">I forgot my password</Link>
//                 </div>
//                 <div className={styles.down}>
//                     <h5>Don't have an account? <Link to="/Register"><button className={styles.here}>Register</button></Link></h5>
//                 </div>
//                 <div className={styles.containerBtn}>
//                     {!infoGoogle.email && <div id="signInDiv"></div>}
//                     {example && infoGoogle.email && <div onClick={viewAlert}><strong>Logging in...</strong></div>}
//                 </div>
//             </Form>
//         </div>
//     );
// }


// import { useEffect } from "react";
// import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form';
// import styles from "../styles/Login.module.css";
// import { Link, useNavigate } from "react-router-dom"
// import { useState } from 'react';
// import { useDispatch } from "react-redux";
// import { userLogin, UserActive, ChangeNav, postUsersGoogle, loginGoogle } from '../redux/actions/UsersActions';
// import swal from 'sweetalert';
// import jwt_decode from "jwt-decode";

// function validate(input) {

//     let errors = {};
//     const regexEmail = /^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/g

//     if (!input.password) {
//         errors.password = "password is required";
//     }

//     if (input.password.length > 12) {
//         errors.password = "Max 12 caracteres";
//     }

//     if (input.password.length < 5) {
//         errors.password = "Min 5 caracteres";
//     }
//     if (input.email && !regexEmail.test(input.email)) {
//         errors.email = "insert email valid";
//     }
//     if (!input.email) {
//         errors.email = "email is required";
//     }
//     return errors;
// };


// export const Login = () => {
//     const [example, setExample] = useState(false)
//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//     const [errors, setErrors] = useState({})
//     const [errormsg, setErrormsg] = useState(false)
//     const [input, setInput] = useState({
//         email: "",
//         password: "",
//     });

//     const [infoGoogle, SetInfoGoogle] = useState({
//         email: "",
//         lastname: "",
//         name: "",
//         image: "",
//     })

//     function handleChange(e) {
//         setInput({
//             ...input,
//             [e.target.name]: e.target.value
//         });
//         setErrors(validate({
//             ...input,
//             [e.target.name]: e.target.value
//         }));
//     };

//     //   useEffect(() => {
// //     const isAuthenticated = localStorage.getItem('isAuthenticated');
// //     if (isAuthenticated === "On") {
// //       navigate('/Profile');
// //     }
// //   }, [navigate]);

//     const viewAlert = async  () => {

//           let hola = await dispatch(postUsersGoogle(infoGoogle));
//           console.log(hola, "post");
//            const email = {
//             email : infoGoogle.email
//            }
//            console.log(email, "mail");
//            const usuario = await dispatch(loginGoogle(email))
//            console.log(usuario,  "usuario");

//            if (usuario.success) {
//             console.log(usuario.data.status, "status");  // ACA TENGO
           
//             if (usuario.data.status) {

//                 if (usuario.data.admin) {

//                     dispatch(UserActive(usuario))
//                     dispatch(ChangeNav())
//                     localStorage.setItem('isAuthenticated', "On");
//                     setTimeout( ()=> {
//                         navigate("/admin/users")
//                 }, 800)

//                 } else { 
//                     dispatch(UserActive(usuario))
//                     dispatch(ChangeNav())
//                     localStorage.setItem('isAuthenticated', "On");
//                     setTimeout( ()=> {
//                         navigate("/Profile")
        
//                 }, 800)
//                 }
            


//             } else { 
//                 return swal("User Banned", "your account has been suspended", "error");
//             }
//     }

//   }

//      function HandleCallbackResponse(response) {
//         var userObject = jwt_decode(response.credential);  
//         SetInfoGoogle({ email: userObject.email,
//         lastname: userObject.family_name,
//         name: userObject.given_name,
//         image: userObject.picture
//         }
//         )     
//         swal({
//             title: "Iniciar sesion con mi cuenta de Google",
//             text: "Al iniciar sesion das permiso a de acceder a tus datos como nombre, correo e imagen de perfil",
//             icon: "warning",
//             buttons: ["No", "Si"]
//           }).then( (respuesta) => {
//           if(respuesta){
//             setExample(true)
//           }
//         })
       
//     }

//     useEffect(() => {
//         /* global google */
//         google.accounts.id.initialize({
//             client_id: "816022596259-o6ktnr2grp3kpla75vn0f7n12o8nmej7.apps.googleusercontent.com",
//             callback: HandleCallbackResponse
//         });
//         google.accounts.id.renderButton(
//             document.getElementById("signInDiv"),
//             { theme: "outline", size: "large" },
//         );

//         // eslint-disable-next-line react-hooks/exhaustive-deps
//     }, []);

       
//     async function handleSubmit(e) {
//         e.preventDefault();
//         if (!input.password || !input.email) {
//             return swal("Invalid", "Missing required fields!", "error");
//         }
//         else {
//             const response = await dispatch(userLogin(input));
//             if (response.data.success) {
//                 //dispatch(PutUserProfile(response.data, response.data.user.id))
// //console.log ("DATA", response.data.user)
//                 if (response.data.user.status) {

//                     if (response.data.user.admin) {
//                         dispatch(UserActive(response.data.user))
//                         dispatch(ChangeNav())
//                         localStorage.setItem('isAuthenticated', "On");
//                         setErrormsg(false)
//                         setTimeout(() => {
//                             setInput({
//                                 email: "",
//                                 password: ""
//                             });
//                             navigate("/admin/users")
//                         }, 1300)

//                     } else {
//                         dispatch(UserActive(response.data.user))
//                         dispatch(ChangeNav())
//                         localStorage.setItem('isAuthenticated', "On");
//                         setErrormsg(false)
//                         setTimeout(() => {
//                             setInput({
//                                 email: "",
//                                 password: ""
//                             });
//                             navigate("/Profile")
//                         }, 1300)
//                     }




//                 } else {
//                     return swal("User Banned", "your account has been suspended", "error");
//                 }

//             } else {
//                 setErrormsg(true)
//                 setTimeout(() => {
//                     setErrormsg(false)
//                 }, 5000)
//                 return
//             }

//         }
//     }


//     return (
//         <div className={styles.ContainerAllForm}>
//             <Form className={styles.ContainerAll} onSubmit={e => handleSubmit(e)}>
//                 <div className={styles.register}>
//                     <h2>Login</h2>
//                 </div>
//                 <Form.Group className={styles.pack} controlId="formBasicEmail">
//                     <Form.Label>Email address</Form.Label>
//                     <Form.Control name='email' onChange={e => handleChange(e)} value={input.email} className={styles.inputs} type="email" placeholder="Enter email" />
//                 </Form.Group>
//                 <Form.Group className={styles.pack} controlId="formBasicPassword">
//                     <Form.Label>Password</Form.Label>
//                     <Form.Control className={styles.inputs} name='password' value={input.password} onChange={e => handleChange(e)} type="password" placeholder="Password" />      
//                 </Form.Group>
//                 {errormsg && <small className={styles.msgerr}>Password or email invalid</small>}
//                 <div className={styles.containerBtn}>
//                     <Button className={styles.btnR} type="submit">
//                         Login
//                     </Button>
//                 </div>
//                 <div style={{marginLeft: "150px", color: "rgb(0, 96, 151)", cursor: "pointer"}}>
//                    <Link to="/changePass">I forgot my password</Link> 
//                 </div>
//                 <div className={styles.down}>
//                     <h5>Dont have an account? <Link to="/Register"><button className={styles.here}>Register</button></Link> </h5>
//                 </div>
//                     <div className={styles.containerBtn}>
//                      {  !infoGoogle.name && !infoGoogle.email && !infoGoogle.lastname && <div id="signInDiv"></div>}
//                     {
//                    example && infoGoogle.name && infoGoogle.email && infoGoogle.lastname && <div onClick={viewAlert()}><strong>Ingresando...</strong></div>
//                  }
//                   </div>
//             </Form>
//         </div>
//     )

// }



//     // async function handleSubmit(e) {
//     //     e.preventDefault();
//     //     if (!input.password || !input.email) {
//     //         return swal("Invalid", "Missing required fields!", "error");
//     //     } else {
//     //         const response = await dispatch(userLogin(input));
//     //         if (response.data.success) {
//     //             const userData = response.data.user;
//     //                    console.log("login ok USER DATA", userData)
//     //             if (userData.status) {
//     //                 Almacenar userID y email en localStorage
//     //                 localStorage.setItem('id', userData.id);  // Asegúrate de que 'id' sea el campo correcto en la respuesta
//     //                 localStorage.setItem('email', userData.email);
//     //                 localStorage.setItem('token', response.data.token);
    
//     //                 if (userData.admin) { 
//     //                     dispatch(UserActive(response.data));
//     //                     dispatch(ChangeNav());
//     //                     localStorage.setItem('isAuthenticated', "On");
//     //                     setErrormsg(false);
//     //                     setTimeout(() => {
//     //                         setInput({
//     //                             email: "",
//     //                             password: ""
//     //                         });
//     //                         navigate("/admin/users");
//     //                     }, 1300);
    
//     //                 } else { 
//     //                     dispatch(UserActive(response.data));
//     //                     dispatch(ChangeNav());
//     //                     localStorage.setItem('isAuthenticated', "On");
//     //                     setErrormsg(false);
//     //                     setTimeout(() => {
//     //                         setInput({
//     //                             email: "",
//     //                             password: ""
//     //                         });
//     //                         navigate("/Profile");
//     //                     }, 1300);
//     //                 }
    
//     //             } else { 
//     //                 return swal("User Banned", "your account has been suspended", "error");
//     //             }
                   
//     //         } else {
//     //             setErrormsg(true);
//     //             setTimeout(() => {
//     //                 setErrormsg(false);
//     //             }, 5000);
//     //             return;
//     //         }
//     //     }
//     // }
