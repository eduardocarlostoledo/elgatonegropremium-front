import { useState } from 'react';
import styles from "../styles/Register.module.css";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { userRegister } from '../redux/slices/userSlice.js';
import swal from 'sweetalert';
import axiosClient from '../herramientas/clienteAxios.js';

// Validación de los campos
function validate(input) {
    let errors = {};
    const regexName = /^([a-zA-Z ]+)$/i;
    const regexEmail = /^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/;

    if (input.name && !regexName.test(input.name)) {
      errors.name = "Can't include special characters or numbers";
    }
    if (!input.name) {
      errors.name = "Name is required";
    }
    if (input.name.length > 15) {
      errors.name = "Max 15 characters";
    }
    if (input.name.length < 2) {
      errors.name = "Min 2 characters";
    }
    if (input.lastname && !regexName.test(input.lastname)) {
      errors.lastname = "Can't include special characters";
    }
    if (!input.lastname) {
      errors.lastname = "Last name is required";
    }
    if (input.lastname.length > 15) {
      errors.lastname = "Max 15 characters";
    }
    if (input.lastname.length < 2) {
      errors.lastname = "Min 2 characters";
    }
    if (!input.password) {
        errors.password = "Password is required";
    }
    if (input.password.length > 20) {
        errors.password = "Max 20 characters";
    }
    if (input.password.length < 8) {
        errors.password = "Min 8 characters, 1 uppercase, 1 lowercase";
    }
    if (input.passwordConfirm !== input.password) {
        errors.passwordConfirm = "Passwords must match";
    }
    if (input.email && !regexEmail.test(input.email)) {
        errors.email = "Invalid email format";
    }
    if (!input.email) {
        errors.email = "Email is required";
    }
    return errors;
}

export const Register = () => {
    
    const navigate = useNavigate();
    const regexName = /^([a-zA-Z ]+)$/i;
    const regexPassword = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])[A-Za-z\d]{8,20}$/;
    const regexEmail = /^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/;

    const dispatch = useDispatch();

    const [errors, setErrors] = useState({});
    const [input, setInput] = useState({
        name: "",
        lastname: "",
        email: "",
        password: "",
        passwordConfirm: "",
    });

    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        });
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value,
        }));
    }

    async function handleSubmit(e) {
        e.preventDefault();

        if (!input.name || !input.lastname || !input.password || !input.email) {
            return swal("Invalid", "Missing required fields!", "error");
        }

        if (!regexEmail.test(input.email)) {
            return swal("Invalid", "Email is invalid", "error");
        }

        if (!regexName.test(input.name)) {
            return swal("Invalid", "Name is invalid", "error");
        }

        if (!regexName.test(input.lastname)) {
            return swal("Invalid", "Last name is invalid", "error");
        }

        if (!regexPassword.test(input.password)) {
            return swal("Invalid", "Password is invalid, must include uppercase and lowercase", "error");
        }

        if (input.password !== input.passwordConfirm) {
            return swal("Invalid", "Passwords must match", "error");
        }
    

        try {
            console.log("entramos al try de handlesubmit")
            const response = await axiosClient.post("/users/register", input)
            console.log(response.status)
            
            if (response.status === 200)

            {swal("Success", "Cuenta Creada!", "success");
            setInput({
                name: "",
                lastname: "",
                email: "",
                password: "",
                passwordConfirm: "",
            });

            navigate("/Login");
        }    
        else {
            swal("Error", "Inténtalo de nuevo", "Error");
        }    
        } catch (error) {
            swal("Contacta al Administrador", "Se ha Producido un Error", "error");
        }
    }

    return (
        <div className={styles.ContainerAllForm}>
            <form className={styles.ContainerAll} onSubmit={handleSubmit}>
                <div className={styles.register}>
                    <h2>Register</h2>
                </div>

                <div className={styles.hola}>
                    <div className={styles.pack}>
                        <label htmlFor="name">Name</label>
                        <input
                            id="name"
                            name="name"
                            value={input.name}
                            onChange={handleChange}
                            className={styles.name}
                            type="text"
                            placeholder="User Name"
                        />
                        {errors.name && <p className={styles.spanError}>{errors.name}</p>}
                    </div>
                    <div className={styles.pack}>
                        <label htmlFor="lastname">LastName</label>
                        <input
                            id="lastname"
                            name="lastname"
                            value={input.lastname}
                            onChange={handleChange}
                            className={styles.lastname}
                            type="text"
                            placeholder="User Lastname"
                        />
                        {errors.lastname && <p className={styles.spanError}>{errors.lastname}</p>}
                    </div>
                </div>

                <div className={styles.pack}>
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        name="email"
                        value={input.email}
                        onChange={handleChange}
                        className={styles.inputs}
                        type="email"
                        placeholder="Enter email"
                    />
                    {errors.email && <p className={styles.spanError}>{errors.email}</p>}
                </div>

                <div className={styles.pack}>
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        name="password"
                        value={input.password}
                        onChange={handleChange}
                        className={styles.inputs}
                        type="password"
                        placeholder="Password"
                    />
                    {errors.password && <p className={styles.spanError}>{errors.password}</p>}
                </div>

                <div className={styles.pack}>
                    <label htmlFor="passwordConfirm">Confirm Password</label>
                    <input
                        id="passwordConfirm"
                        name="passwordConfirm"
                        value={input.passwordConfirm}
                        onChange={handleChange}
                        className={styles.inputs}
                        type="password"
                        placeholder="Confirm Password"
                    />
                    {errors.passwordConfirm && <p className={styles.spanError}>{errors.passwordConfirm}</p>}
                </div>

                <div className={styles.containerBtn}>
                    <button className={styles.btnR} type="submit">
                        Register
                    </button>
                </div>

                <div className={styles.down}>
                    <h5>
                        Already have an account? <Link to="/Login"><button className={styles.here}>Login here</button></Link>
                    </h5>
                </div>
            </form>
        </div>
    );
};

// import { useState } from 'react';
// import styles from "../styles/Register.module.css";
// import { Link, useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from "react-redux";
// import { userRegister } from '../redux/slices/userSlice.js';
// import swal from 'sweetalert';

// function validate(input) {
//     let errors = {};
//     const regexName = /^([a-zA-Z ]+)$/i;
//     const regexEmail = /^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/;

//     if (input.name && !regexName.test(input.name)) {
//       errors.name = "Can't include special characters or numbers";
//     }
//     if (!input.name) {
//       errors.name = "Name is required";
//     }
//     if (input.name.length > 15) {
//       errors.name = "Max 15 characters";
//     }
//     if (input.name.length < 2) {
//       errors.name = "Min 2 characters";
//     }
//     if (input.lastname && !regexName.test(input.lastname)) {
//       errors.lastname = "Can't include special characters";
//     }
//     if (!input.lastname) {
//       errors.lastname = "Last name is required";
//     }
//     if (input.lastname.length > 15) {
//       errors.lastname = "Max 15 characters";
//     }
//     if (input.lastname.length < 2) {
//       errors.lastname = "Min 2 characters";
//     }
//     if (!input.password) {
//         errors.password = "Password is required";
//     }
//     if (input.password.length > 20) {
//         errors.password = "Max 20 characters";
//     }
//     if (input.password.length < 8) {
//         errors.password = "Min 8 characters, 1 uppercase, 1 lowercase";
//     }
//     if (input.passwordConfirm !== input.password) {
//         errors.passwordConfirm = "Passwords must match";
//     }
//     if (input.email && !regexEmail.test(input.email)) {
//         errors.email = "Invalid email format";
//     }
//     if (!input.email) {
//         errors.email = "Email is required";
//     }
//     return errors;
// }

// export const Register = () => {
//     const users = useSelector((state) => state.users.emails || []);
//     const emails = users ? (users?.map(e => e.email)) : [] ;
//     const navigate = useNavigate();
//     const regexName = /^([a-zA-Z ]+)$/i;
//     const regexPassword = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])[A-Za-z\d]{8,20}$/;
//     const regexEmail = /^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/;

// console.log("emails de register users", users, emails)

//     const dispatch = useDispatch();
//     const [errors, setErrors] = useState({});
//     const [input, setInput] = useState({
//         name: "",
//         lastname: "",
//         email: "",
//         password: "",
//         passwordConfirm: "",
//     });

//     function handleChange(e) {
//         setInput({
//             ...input,
//             [e.target.name]: e.target.value,
//         });
//         setErrors(validate({
//             ...input,
//             [e.target.name]: e.target.value,
//         }));
//     }

//     function handleSubmit(e) {
//         e.preventDefault();

//         if (!input.name || !input.lastname || !input.password || !input.email) {
//             return swal("Invalid", "Missing required fields!", "error");
//         }

//         if (!regexEmail.test(input.email)) {
//             return swal("Invalid", "Email is invalid", "error");
//         }

//         if (!regexName.test(input.name)) {
//             return swal("Invalid", "Name is invalid", "error");
//         }

//         if (!regexName.test(input.lastname)) {
//             return swal("Invalid", "Last name is invalid", "error");
//         }

//         if (!regexPassword.test(input.password)) {
//             return swal("Invalid", "Password is invalid, must include uppercase and lowercase", "error");
//         }

//         if (input.password !== input.passwordConfirm) {
//             return swal("Invalid", "Passwords must match", "error");
//         }

//         if (emails.includes(input.email)) {
//             return swal("Invalid", "Email already exists", "error");
//         }

//         dispatch(userRegister(input));
//         swal("Success", "User created successfully", "success");
//         setInput({
//             name: "",
//             lastname: "",
//             email: "",
//             password: "",
//             passwordConfirm: "",
//         });
//         navigate("/Login");
//     }

//     return (
//         <div className={styles.ContainerAllForm}>
//             <form className={styles.ContainerAll} onSubmit={handleSubmit}>
//                 <div className={styles.register}>
//                     <h2>Register</h2>
//                 </div>

//                 <div className={styles.hola}>
//                     <div className={styles.pack}>
//                         <label htmlFor="name">Name</label>
//                         <input
//                             id="name"
//                             name="name"
//                             value={input.name}
//                             onChange={handleChange}
//                             className={styles.name}
//                             type="text"
//                             placeholder="User Name"
//                         />
//                         {errors.name && <p className={styles.spanError}>{errors.name}</p>}
//                     </div>
//                     <div className={styles.pack}>
//                         <label htmlFor="lastname">Last Name</label>
//                         <input
//                             id="lastname"
//                             name="lastname"
//                             value={input.lastname}
//                             onChange={handleChange}
//                             className={styles.lastname}
//                             type="text"
//                             placeholder="User Lastname"
//                         />
//                         {errors.lastname && <p className={styles.spanError}>{errors.lastname}</p>}
//                     </div>
//                 </div>

//                 <div className={styles.pack}>
//                     <label htmlFor="email">Email address</label>
//                     <input
//                         id="email"
//                         name="email"
//                         value={input.email}
//                         onChange={handleChange}
//                         className={styles.inputs}
//                         type="email"
//                         placeholder="Enter email"
//                     />
//                     {errors.email && <p className={styles.spanError}>{errors.email}</p>}
//                 </div>

//                 <div className={styles.pack}>
//                     <label htmlFor="password">Password</label>
//                     <input
//                         id="password"
//                         name="password"
//                         value={input.password}
//                         onChange={handleChange}
//                         className={styles.inputs}
//                         type="password"
//                         placeholder="Password"
//                     />
//                     {errors.password && <p className={styles.spanError}>{errors.password}</p>}
//                 </div>

//                 <div className={styles.pack}>
//                     <label htmlFor="passwordConfirm">Confirm Password</label>
//                     <input
//                         id="passwordConfirm"
//                         name="passwordConfirm"
//                         value={input.passwordConfirm}
//                         onChange={handleChange}
//                         className={styles.inputs}
//                         type="password"
//                         placeholder="Confirm Password"
//                     />
//                     {errors.passwordConfirm && <p className={styles.spanError}>{errors.passwordConfirm}</p>}
//                 </div>

//                 <div className={styles.containerBtn}>
//                     <button className={styles.btnR} type="submit">
//                         Register
//                     </button>
//                 </div>

//                 <div className={styles.down}>
//                     <h5>
//                         Already have an account? <Link to="/Login"><button className={styles.here}>Login here</button></Link>
//                     </h5>
//                 </div>
//             </form>
//         </div>
//     );
// }

// import Button from 'react-bootstrap/Button';
// import { useState } from 'react';
// import Form from 'react-bootstrap/Form';
// import styles from "../styles/Register.module.css";
// import { Link, useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from "react-redux";
// import { userRegister} from '../redux/actions/UsersActions';
// import swal from 'sweetalert';



// function validate(input) {

//     let errors = {};
//     const regexName = /^([a-zA-Z ]+)$/i;
//     // const regexPassword = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[a-zA-Z!#$%&? "])[a-zA-Z0-9!#$%&?]{8,20}$/
//     // const regexNumber = /^[0-9]*$/i;
//     const regexEmail = /^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/;

//     if (input.name && !regexName.test(input.name)) {
//       errors.name = "can't include special characters or numbers";
//     }
//     if (!input.name) {
//       errors.name = "Name is required";
//     }
//     if (input.name.length > 15) {
//       errors.name = "Max 12 caracteres";
//     }
//     if (input.name.length < 2) {
//       errors.name = "Min 2 caracteres";
//     }
//      if (input.lastname && !regexName.test(input.lastname)) {
//       errors.lastname = "can't include special characters";
//     }
//     if (!input.lastname) {
//       errors.lastname = "lastname is required";
//     }
//     if (input.lastname.length > 15) {
//       errors.lastname = "Max 12 caracteres";
//     }
//     if (input.lastname.length < 2) {
//       errors.lastname = "Min 2 caracteres";
//     }
//     if (!input.password) {
//         errors.password = "password is required";
//     }
    
//     if (input.password.length > 12) {
//         errors.password = "Max 20 caracteres";
//     }
    
//     if (input.password.length < 8) {
//         errors.password = "Min 8 Caracteress, 1 Mayusc, 1 Minus";
//     }
//     if (input.passwordConfirm !== input.password) {
//         errors.passwordConfirm = "passwords must match";
//     }
//     if (input.email && !regexEmail.test(input.email)) {
//         errors.email = "insert email valid";
//     }
//     if (!input.email) {
//         errors.email = "email is required";
//     }
//     return errors;
// };


// export const Register = () => {
//     let users = useSelector((state) => state.emails.data || [])
// //    console.log(users);
//     let emails = users.map(e => e.email)
//     // console.log(emails);
//     const navigate = useNavigate();
//     const regexName = /^([a-zA-Z ]+)$/i;
//     const regexPassword = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[a-zA-Z!#$%&? "])[a-zA-Z0-9!#$%&?]{8,20}$/
//     const regexEmail = /^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/;

//     const dispatch = useDispatch();
//     const [errors, setErrors] = useState({})
//     const [input, setInput] = useState({
//         name: "",
//         lastname: "",
//         email: "",
//         password: "",
//         passwordConfirm: "",
//     });


//     // useEffect(() => {
//     //     const isAuthenticated = localStorage.getItem('isAuthenticated');
//     //     if (isAuthenticated === "On") {
//     //       navigate('/Profile');
//     //     }
//     //   }, [navigate]);
    

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


//     function handleSubmit(e) {
//         e.preventDefault();

//         if (!input.name || !input.lastname || !input.password || !input.email) {
//             return swal("Invalid", "Missing required fields!", "error");
//         }

//         if (input.email && input.email.length > 0 && input.email !== "") {
//             if (!regexEmail.test(input.email)) {
//                 return swal("Invalid","Email invalid", "error")
//             }
//           }

//           if (input.name && input.name.length > 0 && input.name !== "") {
//             if (!regexName.test(input.name)) {
//                 return swal("Invalid","Name invalid", "error")
//             }
//           }
//           if (input.lastname && input.lastname.length > 0 && input.lastname !== "") {
//             if (!regexName.test(input.lastname)) {
//                 return swal("Invalid","Lastname invalid", "error")
//             }
//           }
        
//           if (input.password && input.password.length > 0 && input.password !== "") {
//             if (!regexPassword.test(input.password)) {
//                 return swal("Invalid","Password invalid require 1May 1Min", "error")
//             }
//           }

//           if (input.password !== input.passwordConfirm) {
//             return swal("Invalid","Passwords must match", "error")
//           }

//           if (emails.includes(input.email)) {
//             return swal("Invalid",'Email already exists', "error")
//         }


//             dispatch(userRegister(input));
//             swal("success",'User created successfully', "success")
//             setInput({
//                 name: "",
//                 lastname: "",
//                 email: "",
//                 password: "",
//                 passwordConfirm: "",
//             });
//             navigate("/Login")
//           }

    
//     return (
//         <div className={styles.ContainerAllForm}>
//             <Form className={styles.ContainerAll} onSubmit={e => handleSubmit(e)}>
//                 <div className={styles.register}>
//                     <h2>Register</h2>
//                 </div>
              
              
//                 <div className={styles.hola}>
//                     <Form.Group className={styles.pack} controlId="formBasicName">
//                         <Form.Label>Name</Form.Label>
//                         <Form.Control name='name' value={input.name}  onChange={e => handleChange(e)} className={styles.name} type="text" placeholder="User Name" />
//                         {(errors.name && input.name.length > 0 ) && (<p className={styles.spanError}>{errors.name}</p>)}
//                     </Form.Group>
//                     <Form.Group className={styles.pack} controlId="formBasicLastName">
//                         <Form.Label>Last Name</Form.Label>
//                         <Form.Control name='lastname' value={input.lastname}  onChange={e => handleChange(e)} className={styles.lastname} type="text" placeholder="User Lastname" />
//                          {(errors.lastname && input.lastname.length > 0 ) && (<p className={styles.spanError}>{errors.lastname}</p>)}
//                     </Form.Group>
//                 </div>
               
               
//                 <Form.Group className={styles.pack} controlId="formBasicEmail">
//                     <Form.Label>Email address</Form.Label>
//                     <Form.Control name='email'  onChange={e => handleChange(e)} value={input.email} className={styles.inputs} type="email" placeholder="Enter email" />
//                     {(errors.email && input.email.length > 0 ) && (<p className={styles.spanError}>{errors.email}</p>)}
//                 </Form.Group>
               
               
               
//                 <Form.Group className={styles.pack} controlId="formBasicPassword">
//                     <Form.Label>Password</Form.Label>
//                     <Form.Control name='password' value={input.password} onChange={e => handleChange(e)} className={styles.inputs} type="password" placeholder="Password" />
//                     {(errors.password && input.password.length > 0 ) && (<p className={styles.spanError}>{errors.password}</p>)}
//                 </Form.Group>

//                 <Form.Group className={styles.pack} controlId="formBasicPasswordConfirm">
//                     <Form.Label>Confirm Password</Form.Label>
//                     <Form.Control name='passwordConfirm' value={input.passwordConfirm} onChange={e => handleChange(e)} className={styles.inputs} type="password" placeholder="Password" />
//                     {(errors.passwordConfirm && input.passwordConfirm.length > 0 ) && (<p className={styles.spanError}>{errors.passwordConfirm}</p>)}
//                 </Form.Group>


//                 <div className={styles.containerBtn}>
//                     <Button className={styles.btnR} type="submit">
//                         Register
//                     </Button>
//                 </div>
              
              
//                 <div className={styles.down}>
//                     <h5>Alredy have an account? <Link to="/Login"><button className={styles.here}>Login here</button></Link></h5>
//                 </div>
//             </Form>
//         </div>
//     )

// }