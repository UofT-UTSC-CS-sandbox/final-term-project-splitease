import React from "react";
import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./SharingDetail.css";


const SharingDetail = ({ sharings }) => {
    const navigate = useNavigate();

    // const handle = useCallback(() => {
    //     navigate(-1);
    // }, [navigate]);
    // return (


    //     <div className="activity">
    //         <img src={avatar} className="avatar" />
    //         <div className="activity-details"><div className="activity-name">{name}</div> </div>
    //         <div className="activity-amount-positive"> ${amount} </div>
    //     </div>



    // );
    return (
        <div className="activity_share">
            {sharings.map((sharing) => (
                <div key={sharing.id} className="activity-item">
                    < img src={sharing.avatar} className="avatar" />
                    <div className="activity-details">
                        <div className="activity-name">{sharing.name}</div>
                    </div>
                    <div className={sharing.amount >= 0 ? "activity-amount-positive" : "activity-amount-negative"}>${sharing.amount}</div>
                </div>
            ))}
        </div>
    );

};

export default SharingDetail;


