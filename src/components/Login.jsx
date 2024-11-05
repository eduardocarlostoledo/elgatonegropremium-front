import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import swal from 'sweetalert';
import { jwtDecode } from "jwt-decode";
import { loginUser, userActive, changeNav, postUsersGoogle, postGoogle, loginGoogle } from '../redux/slices/userSlice.js';
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
        try {
            const googleUser = await dispatch(postGoogle(infoGoogle));
            const email = { email: infoGoogle.email };
            const userResponse = await dispatch(loginGoogle(email));
    
            console.log("Google User Response:", googleUser);
            console.log("Login User Response:", userResponse);
    
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
        } catch (error) {
            console.error("Error in viewAlert:", error);
            swal("Error", "Something went wrong!", "error");
        }
    }
    

    function handleGoogleResponse(response) {
        const userObject = jwtDecode(response.credential);
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
                viewAlert(); // Llama a viewAlert() aquí para continuar con el flujo
            }
        });
    }

    useEffect(() => {
        /* global google */
        google.accounts.id.initialize({
            client_id: `${import.meta.env.VITE_APP_YOUR_CLIENT_ID_LOGIN}`,
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
