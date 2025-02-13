import React, { useContext, useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import SelfData from './SelfData';
import AuthContext from '../context/AuthContext';
import Dropdown from '../util/Dropdown';
import '../style/Dropdown.css';

const Navbar = (props) => {
    const { userName } = props;
    const { getUserList } = useContext(AuthContext);
    const dropdownRef = useRef(null);
    const [userList, setUserList] = useState([]);
    const [searchNameValue, setSearchNameValue] = useState('');
    const token = localStorage.getItem('token');

    const debouncer = (getUserListDebounced, timeout) => {
        let timer = null;
        return (args) => {
            clearTimeout(timer);
            timer = setTimeout(async () => setUserList(await getUserListDebounced(args)), timeout);
        }
    };

    const displayUserList = debouncer(getUserList, 500);

    const handleSearchChange = async (event) => {
        const searchName = event.target.value;
        setSearchNameValue(searchName);
        displayUserList(searchName);
    };

    const handleSearchClick = async (event) => {
        const searchName = event.target.value;
        setSearchNameValue(searchName);
        displayUserList(searchName);
    }

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <Link className="navbar-brand" to={token ? "/" : '/login'}>Shush</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    {
                        token ? <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link" aria-current="page" to="/">Feed</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to={`/shushes/${userName}`}>Shushes</Link>
                            </li>
                            {/* <li className="nav-item">
                                <Link className="nav-link" to={`/shushem`}>Shush em</Link>
                            </li> */}
                        </ul> : ''
                    }
                    {
                        token ?
                            (
                                <>
                                    <form id='dropdownStyle' className="d-flex" role="search">
                                        <input onClick={handleSearchClick} onChange={handleSearchChange} className="form-control me-2" type="search" placeholder="Search for a User" aria-label="Search" />
                                        <Dropdown dropdownRef={dropdownRef} userList={userList} />
                                        <a href={`/allUsers/${searchNameValue}`} className="btn btn-outline-success"><i className="fas fa-search"></i></a>
                                    </form>
                                </>
                            )
                            : ''
                    }
                    {
                        !(token) ? <ul className="navbar-nav ">
                            <li className="nav-item">
                                <Link className="nav-link" to="/login">Login</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/signup">Sign Up</Link>
                            </li>
                        </ul> : <SelfData />
                    }
                </div>
            </div>
        </nav>
    )
}

export default Navbar
