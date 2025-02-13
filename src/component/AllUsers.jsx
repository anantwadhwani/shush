import React, { useState, useContext, useEffect } from 'react'
import AuthContext from '../context/AuthContext';
import '../style/Dropdown.css';
import { Link, useParams } from 'react-router-dom';

const AllUsers = () => {
    const { searchNameValue } = useParams();
    const { getUserList } = useContext(AuthContext);
    const [userList, setUserList] = useState([]);
    let users = [];
    let displayList = '';

    useEffect(() => {
        getUserList(searchNameValue).then((userListResponse) => {
            setUserList(userListResponse);
        });
        //eslint-disable-next-line
    }, []);

    if (userList.length) {
        userList.map((user) => {
            return (
                <>
                    {users.push(<li key={user._id}><Link to={{ pathname: `/shushem/${user.userName}` }}>{user.name}</Link></li>)}
                    {users.push(<hr key={user._id + 'hr'} className='dropdownUserListBreak' />)}
                </>
            )
        })

        displayList = (<ul style={{ listStyleType: 'none' }}>{users}</ul>);
    }

    return (
        <div className='container mt-3 mb-5'>
            <h5 className='my-5'>Users for {searchNameValue}</h5>
            {displayList}
        </div>
    )
}

export default AllUsers;
