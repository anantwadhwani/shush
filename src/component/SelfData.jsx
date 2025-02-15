import React, { useContext, useEffect, useRef } from 'react'
import AuthContext from '../context/AuthContext';

const SelfData = () => {
    const { selfData, getSelfData,  } = useContext(AuthContext);
    let { name, secretUserName, email, date } = selfData;
    const loginPageRef = useRef();

    useEffect(() => {
        getSelfData();
        // eslint-disable-next-line
    }, []);

    const handleLogOut = () => {
        localStorage.removeItem('token');
        loginPageRef.current.click();
    }

    return (
        <div className="btn-group dropstart ms-5">
            <button type="button" className="btn btn-info dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                {name}
            </button>
            <ul style={{ paddingBottom: '0rem' }} className="dropdown-menu">
            <li><p className="dropdown-item">Your secret identity: {secretUserName}</p></li>
                <li><p className="dropdown-item">{email}</p></li>
                <li><p className="dropdown-item">Member since {new Date(date).getUTCDate()}/{new Date(date).getUTCMonth()}/{new Date(date).getUTCFullYear()}</p></li>
                <li style={{ borderBottomLeftRadius: '0.2rem', borderBottomRightRadius: '0.2rem', marginBottom: '0' }}><button onClick={handleLogOut} type="button" style={{ width: '100%', backgroundColor: 'red', color: 'white', border: '0.1rem red solid', borderBottomLeftRadius: '0.2rem', borderBottomRightRadius: '0.2rem' }}>Log Out</button></li>
                <li style={{ display: 'none' }}><a ref={loginPageRef} href='/'> </a></li>
            </ul>
        </div>
    )
}

export default SelfData
