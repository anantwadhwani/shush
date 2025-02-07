import React from 'react';
import ShushContext from "./ShushContext";

const ShushState = (props) => {
    const url = 'http://localhost:5000/shush';

    const getUserShushes = async () => {
        const token = localStorage.getItem('token');
        const userShushes = await fetch(url+'/userShushes', {
            method: 'GET',
            headers: {
                'Auth-Token': token,
            }
        });

        return await userShushes.json();
    };

    const postUserShush = async(name, userName, message) => {
        const token = localStorage.getItem('token');
        const postResponse = await fetch(url+'/shush',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Auth-Token': token
                },
                body: JSON.stringify({ name, userName, message })
            }
        );
        return await postResponse.json();
    }

    const feedShushes = async() => {
        const token = localStorage.getItem('token');
        const allShushes = await fetch(url+'/feed', {
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
