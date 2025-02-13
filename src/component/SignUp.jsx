import React, { useContext, useRef } from 'react';
import AuthContext from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
// import { useGoogleLogin } from '@react-oauth/google';
// import axios from 'axios';

const SignUp = () => {
    const { userSignUp } = useContext(AuthContext);
    const refName = useRef();
    const refEmail = useRef();
    const refPassword = useRef();
    const navigate = useNavigate();

    const handleUserSignUp = (event) => {
        event.preventDefault();
        const name = refName.current.value;
        const email = refEmail.current.value;
        const password = refPassword.current.value;
        userSignUp(email).then((signUpResponse) => {
            if (signUpResponse.statusMessage === 'success') {
                refName.current.value = '';
                refEmail.current.value = '';
                refPassword.current.value = '';
                navigate('/verify', {state: {name, email, password}});
            } else {
                alert(signUpResponse.msg);
            }
        });
    };

    // const login = useGoogleLogin({
    //     onSuccess: async (tokenResponse) => {
    //         try {
    //             const res = await axios.get('https://www.googleapis.com/oauth2/v1/userinfo',
    //                 {
    //                     headers: {
    //                         Authorization: `Bearer ${tokenResponse.access_token}`,
    //                     }
    //                 }
    //             );
    //             console.log(res);
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     }
    // });

    return (
        <div className="container my-3">
            <h2>Welcome to Shush</h2>
            <p>Sign up to get assigned a secret username to shush em anonymously</p>
            <form className="my-3" onSubmit={handleUserSignUp}>
                <div className="mb-3">
                    <label htmlFor="nameInput" className="form-label">Full Name</label>
                    <input ref={refName} type="text" className="form-control" id="nameInput" placeholder='Enter your full name'  aria-describedby="nameHelp" />
                    <div id="nameHelp" className="form-text">This is how people will search for you</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="emailInput" className="form-label">Email</label>
                    <input ref={refEmail} type="email" className="form-control" id="emailInput" placeholder='Enter your email' aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="passwordInput" className="form-label">Password</label>
                    <input ref={refPassword} type="password" className="form-control" id="passwordInput" placeholder='Enter your password' />
                </div>
                <button type="submit" className="btn btn-primary">Sign up</button>
            </form>
            {/* <h6>Or Sign in using</h6> */}
            {/* <button type='button' className='btn btn-primary' onClick={() => login()}>
                Sign up using Google
            </button> */}
        </div>
    )
}

export default SignUp;
