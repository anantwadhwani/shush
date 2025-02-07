import React, { useState } from 'react'
import AuthContex from "./AuthContext";

const AuthState = (props) => {
    const url = 'http://localhost:5000/auth/';
    const [userData, setUserData] = useState({ name:'', userName: '', date:'', email:'' });

    const userSignUp = async (name, email, password) => {
        const response = await fetch(url + 'signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password })
        })
        return await response.json();
    }

    const userLogin = async (email, password) => {
        const response = await fetch(url + 'login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        })
        return await response.json();
    }

    const getUserData = async () => {
        const userDataResponse = await fetch(url+'userData',
            {
                method: 'GET',
                headers: {
                    'Auth-Token': localStorage.getItem('token'),
                },
            }
        );
        const userDataJson = await userDataResponse.json();
        if(userDataJson.statusMessage === 'success') {
            setUserData(userDataJson.msg);
        }
    }

    return (
        <AuthContex.Provider value={{ userSignUp, userLogin, getUserData, userData }}>
            {props.children}
        </AuthContex.Provider>
    )
}

export default AuthState
