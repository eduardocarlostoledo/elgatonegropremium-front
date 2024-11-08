import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import swal from 'sweetalert';
import { jwtDecode } from "jwt-decode";
import { loginUser, userActive, changeNav, postUsersGoogle, postGoogle, loginGoogle } from '../redux/slices/userSlice.js';
import axiosClient from "../herramientas/clienteAxios";
import "./login.css"
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
    const usuarioConectado = useSelector((state) => state.users.userActive) || {};
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
                viewAlert(); 
            }
        });
    }

    useEffect(() => {
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

        const response = await dispatch(loginUser(input))
        if (response.payload.success && response.payload.msg === "Login successful" ) {
            if (response.payload.user.status) {
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
        <div className="container-all-form">
            <form className="container-all" onSubmit={handleSubmit}>
                <div className="register">
                    <h2>Login</h2>
                </div>
                <div className="pack">
                    <label>Email address</label>
                    <input
                        name="email"
                        value={input.email}
                        onChange={handleChange}
                        className="inputs"
                        type="email"
                        placeholder="Enter email"
                    />
                </div>
                <div className="pack">
                    <label>Password</label>
                    <input
                        name="password"
                        value={input.password}
                        onChange={handleChange}
                        className="inputs"
                        type="password"
                        placeholder="Password"
                    />
                </div>
                {errormsg && <small className="msgerr">Invalid email or password</small>}
                <div className="container-btn">
                    <button className="btnR" type="submit">Login</button>
                </div>
                <div className="forgot-password">
                    <Link to="/changePass">I forgot my password</Link>
                </div>
                <div className="down">
                    <h5>Don't have an account? <Link to="/Register"><button className="here">Register</button></Link></h5>
                </div>
                <div className="container-btn">
                    {!infoGoogle.email && <div id="signInDiv"></div>}
                    {example && infoGoogle.email && <div onClick={viewAlert}><strong>Logging in...</strong></div>}
                </div>
            </form>
        </div>
    );
}
