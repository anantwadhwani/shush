import React from 'react'
import { Link } from 'react-router-dom';
import UserData from './UserData';

const Navbar = (props) => {
    const { name } = props;
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <Link className="navbar-brand" to={localStorage.getItem('token') ? "/" : '/login'}>Shush</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    {localStorage.getItem('token') ? <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link" aria-current="page" to="/">Feed</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to={`/shushes/${name}`}>Shushes</Link>
                        </li>
                        {/* <li className="nav-item">
                            <Link className="nav-link" to="/shushem">Shush em</Link>
                        </li> */}
                    </ul> : ''}
                    {/* {(   */}
                    {!(localStorage.getItem('token')) ? <ul className="navbar-nav me-auto ms-3 mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link" to="/login">Login</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/signup">Sign Up</Link>
                        </li>
                    </ul> : <UserData />}
                </div>
            </div>
        </nav>
    )
}

export default Navbar
