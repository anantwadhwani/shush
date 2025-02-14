import React, { useContext, useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import ShushContext from '../context/ShushContext';
import Modal from '../util/Modal';

const ShushEm = () => {
    const postRef = useRef();
    const { getUserData, selfData } = useContext(AuthContext);
    const { postUserShush, getUserShushes } = useContext(ShushContext);
    const { userName } = useParams();
    const [userData, setUserData] = useState({ name: '', secretUserName: '', userName: '', date: '', email: '' });
    const [userShushes, setUserShushes] = useState([]);
    const [copied, setCopied] = useState(null);
    const urlRef = useRef();

    useEffect(() => {
        getUserData(userName).then((userDataResponse) => {
            setUserData(userDataResponse);
        });
        getUserShushes(userName).then((userShushesResponse) => {
            setUserShushes(userShushesResponse.msg?.reverse());
        });
        //eslint-disable-next-line
    }, []);

    const handlePostSubmit = (event) => {
        event.preventDefault();
        const message = postRef.current.value;
        postUserShush(userData.name, userData.userName, selfData.secretUserName, message).then((response) => {
            if (response.statusMessage === 'success') {
                postRef.current.value = '';
            }
        });
    };

    const handleCopied = async () => {
        navigator.clipboard.writeText(urlRef.current.value);
        setCopied('copied');
    };

    const userUrl = `http://localhost:3000/shushes/${userName}`;

    return (
        <div className="container">
            <div className="row justify-content-md-center">
                <div className="col-sm-6">
                    <div className="card my-5">
                        {/* <img src={img} className="card-img-top" alt="userPic" /> */}
                        <div className="card-body">
                            <h5 className="card-title">{userData.name}</h5>
                            <p className="card-text">{`Shushing since: ${new Date(userData.date).getUTCDate()}/${new Date(userData.date).getUTCMonth()}/${new Date(userData.date).getUTCFullYear()}`}</p>
                            <div id="urlHelp" className="form-text">{userData.name}'s link - share it with people to get them here</div>
                            <div className="mb-3" style={{ border: '0.01rem gray solid', borderRadius: '0.3rem' }}>
                                <input id='urlInput' aria-describedby="urlHelp" ref={urlRef} className="card-text" style={{ width: '90%', border: '0rem', borderRadius: '0.3rem', backgroundColor: 'white' }} disabled value={userUrl} />
                                {copied ? <i className="fa-solid fa-check" style={{ width: '10%' }}></i> : <i onClick={handleCopied} className="fa-regular fa-copy" style={{ width: '10%' }}></i>}
                            </div>
                            <Modal name={`QR Code of ${userData.name}`} value={userUrl} btnText='Show QR Code' qrBool={true} />
                        </div>
                    </div>
                </div>
                <div className="card mt-3 mb-5">
                    <form className="mb-3" onSubmit={handlePostSubmit}>
                        <h5 className="card-title mt-3">Send a message anonymously</h5>
                        <div className="card-body">
                            <textarea ref={postRef} className="form-control" id="textArea" rows="5"></textarea>
                            <i className="mb-3" style={{ display: 'block' }}>Send as {selfData.secretUserName}</i>
                        </div>
                        <button type='submit' onClick={handlePostSubmit} className="btn btn-primary">Shush em</button>
                    </form>
                </div>
                <div className="card mt-3 mb-5">
                    <div className="card-body">
                        <h5 className="card-title">Shushes</h5>
                        {userShushes ? userShushes.map((shush) => {
                            return (
                                <div className="card my-3" key={shush._id}>
                                    <div className="card-body">
                                        {/* <img src={shush.userImg} alt="userPic" /> */}
                                        <h5 className="card-title d-inline"> {shush.name}</h5>
                                        <div className="card-text mb-3">
                                            <span className="card-text">{shush.date}</span>
                                            <span className="card-text"> {shush.message}</span>
                                        </div>
                                        {shush.replies?.map((reply, index) => {
                                            return (
                                                <div className="card my-1" key={shush._id + index}>
                                                    <div className="card-body">
                                                        {/* <img src={reply.userImg} alt="userPic" /> */}
                                                        <h5 className="card-title d-inline"> {reply.userName}</h5>
                                                        <div className="card-text">
                                                            <span className="card-text">{reply.date}</span>
                                                            <span className="card-text"> {reply.message}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                        {/* <a href="/" className="btn btn-primary mt-2">View all replies</a> */}
                                    </div>
                                </div>
                            );
                        }) : 'Not shushed yet'}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ShushEm;