import React from 'react'
import QRCode from 'react-qr-code';

const Modal = (props) => {
    const { name, value, btnText, qrBool, btnRef } = props;
    // let displayValue;
    // if(value) {
    //     if(value instanceof Array) {
    //         displayValue=(
    //             <ul>
    //                 {value.map((user)=> {
    //                     <li><Link to={`/${user.userName}`}>{user.name}</Link></li>
    //                 })}
    //             </ul>
    //         )
    //     } else {
    //         displayValue = value;
    //     }
    // }
    return (
        <>
            <button ref={btnRef} type="button" className={`btn btn-primary ${btnText?'':'d-none'}`} data-bs-toggle="modal" data-bs-target="#modal">
                {btnText}
            </button>

            <div className="modal fade" id="modal" tabIndex="-1" aria-labelledby="modalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="modalLabel">{name}</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                        {qrBool && <QRCode
                                style={{ height: "auto", maxWidth: "50%", width: "50%" }}
                                value={value}
                            />
                        }
                        {/* {!qrBool && displayValue} */}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Modal
