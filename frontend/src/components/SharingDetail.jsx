import React from "react";
import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./SharingDetail.css";


const SharingDetail = ({ avatar, name, amount }) => {
    const navigate = useNavigate();

    const handle = useCallback(() => {
        navigate(-1);
    }, [navigate]);
    return (


        <div className="activity">
            <img src={avatar} className="avatar" />
            <div className="activity-details"><div className="activity-name">{name}</div> </div>
            <div className="activity-amount-positive"> ${amount} </div>
        </div>



    );
};

export default SharingDetail;


