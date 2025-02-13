import React, { useContext, useEffect, useState } from 'react'
import ShushContext from '../context/ShushContext';
import { useNavigate } from 'react-router-dom';

const Feed = () => {
  const navigate = useNavigate();
  if(!(localStorage.getItem('token'))) {
    navigate('/login');
  }
  const { feedShushes } = useContext(ShushContext);
  const [allShushes, setAllShushes] = useState([]);

  useEffect(() => {
    feedShushes().then((feedResponse) => {
      if(feedResponse.statusMessage === 'success') {
        return setAllShushes(feedResponse.msg.reverse());
      }
      return setAllShushes([]);
    });
    // eslint-disable-next-line
  }, []);

  return (
    <div className="container my-5">
      <h5 className='mb-5'>Recent Shushes World Wide</h5>
      {allShushes.length ? <div className="row justify-content-md-center">
        <div className="card">
          {allShushes.map((shush) => {
            return (
              <div className="card my-3" key={shush._id}>
                <div className="card-body">
                  {/* <c src={shush.userImg} alt="userPic" /> */}
                  <h5 className="card-title d-inline"> {shush.name}</h5>
                  <div className="card-text mb-3">
                    <p className="card-text">{`${new Date(shush.date).getMonth()-1}Months ${new Date(shush.date).getDay()}Days ${new Date(shush.date).getMinutes()}Minutes ago`}</p>
                    <span className="card-text">{shush.secretUserName}:</span>
                    <span className="card-text"> {shush.message}</span>
                  </div>
                  {shush.replies?.map((reply, index) => {
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
          })}
        </div>
      </div> : 'Be the first to shush someone'}
    </div>
  )
}

export default Feed;
