import React from 'react'
import '../style/Dropdown.css';
import { Link } from 'react-router-dom';
import Modal from './Modal';

const Dropdown = (props) => {
    const { dropdownRef, userList } = props;
    let displayList;
    let users = [];

    if (userList.length) {
        for (let i = 0; i < 6 && i< userList.length ; i++) {
            if(i<5){
                users.push(<li className='dropdownUserList' key={userList[i]._id}><Link className="dropdown-item" to={{pathname: `/shushem/${userList[i].userName}`}}>{userList[i].name}</Link></li>)
                users.push(<hr  key={userList[i]._id+'hr'} className='dropdownUserListBreak' />)
            } else {
                users.push(<li className='dropdownUserList' key={userList[i]._id}><Modal name='Users' btnText='See all users' qrCode={false} value={userList} /></li>)
            }
        }
        displayList = (<ul ref={dropdownRef} className={`dropdown-content dropdownContentBlock`}>{users}</ul>);
    } else {
        displayList = '';
    }

    return displayList;
}

export default Dropdown;