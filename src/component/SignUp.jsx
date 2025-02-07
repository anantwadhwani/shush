import React, { useContext, useRef } from 'react';
import AuthContext from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    const { userSignUp } = useContext(AuthContext);
    const refName = useRef();
    const refEmail = useRef();
    const refPassword = useRef();
    const navigate = useNavigate('');

    const handleUserSignUp = (event) => {
        event.preventDefault();
        const name = refName.current.value;
        const email = refEmail.current.value;
        const password = refPassword.current.value;

        userSignUp(name, email, password).then((signUpResponse) => {
            if (signUpResponse.statusMessage === 'success') {
                refName.current.value = '';
                refEmail.current.value = '';
                refPassword.current.value = '';
                navigate('/login');
            } else {
                alert(signUpResponse.msg);
            }
        });
    }

    return (
        <div className="container my-3">
            <h2>Welcome to Shush</h2>
            <p>Sign up to get assigned a secret username to shush em anonymously</p>
            <form className="my-3" onSubmit={handleUserSignUp}>
                <div className="mb-3">
                    <label htmlFor="nameInput" className="form-label">Name</label>
                    <input ref={refName} type="text" className="form-control" id="nameInput" aria-describedby="nameHelp" />
                    <div id="nameHelp" className="form-text">This is how people will search for you - This can't be changed.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="emailInput" className="form-label">Email address</label>
                    <input ref={refEmail} type="email" className="form-control" id="emailInput" aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="passwordInput" className="form-label">Password</label>
                    <input ref={refPassword} type="password" className="form-control" id="passwordInput" />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            <h5>Or Sign in using</h5>
            <div class="g-signin2" data-onsuccess="onSignIn"></div>
        </div>
    )
}

export default SignUp;
