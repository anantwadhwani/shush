import React, { useContext, useState, useRef, useEffect } from 'react'
import AuthContext from '../context/AuthContext';
import Modal from '../util/Modal';
import ShushContext from '../context/ShushContext';

const Shushes = () => {
    const { getUserShushes } = useContext(ShushContext);
    const { selfData } = useContext(AuthContext);
    let { userName, name, date } = selfData; // secretUserName
    const [copied, setCopied] = useState(null);
    const [userShushes, setUserShushes] = useState([]);
    const urlRef = useRef();

    useEffect(() => {
        getUserShushes(userName).then((userShushesResponse) => {
            setUserShushes(userShushesResponse.msg?.reverse());
        });
        //eslint-disable-next-line
    }, []);

    const handleCopied = async () => {
        navigator.clipboard.writeText(urlRef.current.value);
        setCopied('copied');
    }
    const userUrl = `http://localhost:3000/shushes/${userName}`;

    return (
        <div className="container">
            <div className="row justify-content-md-center">
                <div className="col-sm-6">
                    <div className="card my-5">
                        {/* <img src={img} className="card-img-top" alt="userPic" /> */}
                        <div className="card-body">
                            <h5 className="card-title">{name}</h5>
                            <p className="card-text">{`Shushing since: ${new Date(date).getMonth()-1}Months ${new Date(date).getDay()}Days ${new Date(date).getMinutes()}Minutes`}</p>
                            <div id="urlHelp" className="form-text">{name}'s link - share it with people to get them here</div>
                            <div className="mb-3" style={{ border: '0.01rem gray solid', borderRadius: '0.3rem' }}>
                                <input id='urlInput' aria-describedby="urlHelp" ref={urlRef} className="card-text" style={{ width: '90%', border: '0rem', borderRadius: '0.3rem', backgroundColor: 'white' }} disabled value={userUrl} />
                                {copied ? <i className="fa-solid fa-check" style={{ width: '10%' }}></i> : <i onClick={handleCopied} className="fa-regular fa-copy" style={{ width: '10%' }}></i>}
                            </div>
                            <Modal name={`QR Code of ${name}`} value={userUrl} btnText='Show QR Code' qrBool={true} />
                        </div>
                    </div>
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
                                        <p className="card-text">{`${new Date(shush.date).getMonth()-1}Months ${new Date(shush.date).getDay()}Days ${new Date(shush.date).getMinutes()}Minutes ago`}</p>
                                            <span className="card-text">{shush.secretUserName}:</span>
                                            <span className="card-text"> {shush.message}</span>
                                        </div>
                                        {shush.replies?.map((reply,index) => {
                                            return (
                                                <div className="card my-1" key={shush._id+index}>
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

export default Shushes;
