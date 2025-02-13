import React, { useContext, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const Verify = () => {
    const  { emailVerify } = useContext(AuthContext);
    const codeRef = useRef();
    const location = useLocation();
    const navigate = useNavigate();

    const handleVerifyEmail = async (event) => {
        event.preventDefault();
        const code = codeRef.current.value;
        const name = location.state.name;
        const email = location.state.email;
        const password = location.state.password;
        emailVerify(code, name, email, password).then((emailVerification) => {
            if (emailVerification.statusMessage === 'success') {
                alert('Verification Successful');
                navigate('/login');
            } else {
                alert('Invalid Code');
            }
        });
    };

    return (
        <div className='container my-3'>
            <h5>Email Verification</h5>
            <form onSubmit={handleVerifyEmail}>
                <p>Please verify with the code received on your email below to start using Shush</p>
                <input ref={codeRef} type='text' placeholder='Enter the code here'></input>
                <button type='submit' style={{ margin: '0 auto' }} className='d-block btn btn-primary my-2'>Verify Email</button>
            </form>
        </div>
    )
}

export default Verify;
