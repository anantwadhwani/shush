import React from 'react'

const ShushEm = (props) => {
    const { img, name, info, date, userGivenName, shushes } = props;
    return (
        <div className="container">
            <div className="row justify-content-md-center">
                <div className="col-sm-6">
                    <div className="card my-5">
                        <img src={img} className="card-img-top" alt="userPic" />
                        <div className="card-body">
                            <h5 className="card-title">{name}</h5>
                            <p className="card-text">{info}</p>
                            <p className="card-text">{date}</p>
                            <a href="/" className="btn btn-primary">Show QR Code</a>
                        </div>
                    </div>
                </div>
                <div className="card mt-3 mb-5">
                    <div className="card-body">
                        <h5 className="card-title">Send a message anonymously</h5>
                        <textarea className="form-control mt-3" id="textArea" rows="5"></textarea>
                        <i className="mb-3" style={{ display: 'block' }}>Sent as {userGivenName}</i>
                        <a href="/" className="btn btn-primary">Shush em</a>
                    </div>
                </div>
                <div className="card mt-3 mb-5">
                    <div className="card-body">
                        <h5 className="card-title">Shushes</h5>
                        {shushes ? shushes.map((shush) => {
                            return <div className="card my-3">
                                <div className="card-body">
                                    <img src={shush.img} alt="userPic" /> <h5 className="card-title">{shush.name}</h5>
                                    <p className="card-text">{shush.date}</p>
                                    <p className="card-text">{shush.message}</p>
                                    {shush.replies?.map((reply) => {
                                        return <div className="card my-1">
                                            <div className="card-body">
                                            <img src={reply.img} alt="userPic" /> <h5 className="card-title">{reply.name}</h5>
                                            <p className="card-text">{reply.date}</p>
                                            <p className="card-text">{reply.message}</p>
                                            </div>
                                        </div>
                                    })}
                                    <a href="/" className="btn btn-primary">View all replies</a>
                                </div>
                            </div>
                        }) : 'Not shushed yet'}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ShushEm
