import React, { useContext, useRef } from 'react';
import AuthContext from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const { userLogin } = useContext(AuthContext);
    const navigate = useNavigate();
    const emailRef = useRef();
    const passwordRef = useRef();

    const handleUserLogin = (event) => {
        event.preventDefault();
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        userLogin(email, password).then((userLoginResponse) => {
            if (userLoginResponse.statusMessage === 'success') {
                localStorage.setItem('token', userLoginResponse.msg);
                emailRef.current.value = '';
                passwordRef.current.value = '';
                navigate('/')
            } else {
                alert(userLoginResponse.msg);
            }
        });
    }

    return (
        <div className="container my-3">
            <h2>Log in to Shush</h2>
            <form className="my-3" onSubmit={handleUserLogin}>
                <div className="mb-3">
                    <label htmlFor="emailInput" className="form-label">Email address</label>
                    <input ref={emailRef} type="email" className="form-control" id="emailInput" />
                </div>
                <div className="mb-3">
                    <label htmlFor="passwordInput" className="form-label">Password</label>
                    <input ref={passwordRef} type="password" className="form-control" id="passwordInput" />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Login
