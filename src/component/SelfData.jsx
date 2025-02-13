import React, { useContext, useEffect } from 'react'
import AuthContext from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const SelfData = () => {
    const { selfData, getSelfData,  } = useContext(AuthContext);
    let { userName, name, secretUserName, email, date } = selfData;
    const navigate = useNavigate();

    useEffect(() => {
        getSelfData();
        // eslint-disable-next-line
    }, []);

    const handleLogOut = () => {
        localStorage.removeItem('token');
        navigate('/login');
    }

    return (
        <div className="btn-group dropstart ms-5">
            <button type="button" className="btn btn-info dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                {name}
            </button>
            <ul style={{ paddingBottom: '0rem' }} className="dropdown-menu">
                <li><p className="dropdown-item">{userName}</p></li>
                <li><p className="dropdown-item">{email}</p></li>
                <li><p className="dropdown-item">{date}</p></li>
                <li><p className="dropdown-item">{secretUserName}</p></li>
                <li style={{ borderRadius: '0.2rem', marginBottom: '0' }}><button onClick={handleLogOut} type="button" style={{ width: '100%' }} className="btn btn-danger">Log Out</button></li>
            </ul>
        </div>
    )
}

export default SelfData
