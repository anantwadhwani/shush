import React from 'react';
import ShushContext from "./ShushContext";

const ShushState = (props) => {
    const api = process.env.REACT_APP_API_URL;
    const url = api + 'shush/';
    // const url = "http://localhost:4000/shush/"
    const token = localStorage.getItem('token');

    const getUserShushes = async (userName) => {
        const userShushes = await fetch(url + 'userShushes/' + userName, {
            method: 'GET',
            headers: {
                'Auth-Token': token,
            }
        });

        return await userShushes.json();
    };

    const postUserShush = async (name, userName, secretUserName, message) => {
        const postResponse = await fetch(url + 'shush',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Auth-Token': token
                },
                body: JSON.stringify({ name, userName, secretUserName, message })
            }
        );
        return await postResponse.json();
    }

    const feedShushes = async () => {
        const allShushes = await fetch(url + 'feed', {
            method: 'GET',
            headers: {
                'Auth-Token': token
            }
        });
        return await allShushes.json();
    }

    return (
        <ShushContext.Provider value={{ getUserShushes, postUserShush, feedShushes }}>
            {props.children}
        </ShushContext.Provider>
    )
}

export default ShushState;
