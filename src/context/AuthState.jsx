import React, { useState } from 'react'
import AuthContex from "./AuthContext";

const AuthState = (props) => {
    const api = process.env.REACT_APP_API_URL;
    const url = api + 'auth/';
    // const url = "http://localhost:4000/auth/"
    const [selfData, setSelfData] = useState({ name: '', secretUserName: '', userName: '', date: '', email: '' });
    const token = localStorage.getItem('token');

    const userSignUp = async (email) => {
        const response = await fetch(url + 'signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email })
        })
        return await response.json();
    }

    const emailVerify = async (code, name, email, password) => {
        const emailVerification = await fetch(url + 'verify', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ code, name, email, password })
        });
        return await emailVerification.json();
    };

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

    const getSelfData = async () => {
        const selfDataResponse = await fetch(url + 'selfData',
            {
                method: 'GET',
                headers: {
                    'Auth-Token': token,
                },
            }
        );
        const selfDataJson = await selfDataResponse.json();
        if (selfDataJson.statusMessage === 'success') {
            setSelfData(selfDataJson.msg);
        }
    }

    const getUserList = async (searchName) => {
        const userListResponse = await fetch(url + 'userList',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Auth-Token': token
                },
                body: JSON.stringify({ searchName })
            },
        );
        const userList = await userListResponse.json();
        const nameList = userList?.msg;
        return nameList;
    }

    const getUserData = async (userName) => {
        const userDataResponse = await fetch(url + 'userData/' + userName,
            {
                method: 'GET',
                headers: {
                    'Auth-Token': token,
                },
            }
        );
        const userDataJson = await userDataResponse.json();
        if (userDataJson.statusMessage === 'success') {
            return userDataJson.msg;
        }
    }

    return (
        <AuthContex.Provider value={{ userSignUp, emailVerify, userLogin, getSelfData, selfData, getUserList, setSelfData, getUserData }}>
            {props.children}
        </AuthContex.Provider>
    )
}

export default AuthState
