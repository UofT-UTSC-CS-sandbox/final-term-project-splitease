import { useCallback } from "react";
import "./ProfileBufferPage.css";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";




//增加两个link
// link to change user name password page 新添加一个ChangepwPage
//const onChangePWClick = useCallback();

//change avantar link to ProfileEditorPage.jsx





const ProfileBufferPage = () => {
    const navigate = useNavigate();
    
    const onChangeAvatarClick = useCallback(() => {
        navigate("/profileeditorpage");
    }, [navigate]);
    
    const onChangePWClick = useCallback(() => {
        navigate("/changepwdpage");
    }, [navigate]);

    const onDeleteIconClick = useCallback(() => {
        navigate("/settingslogoutpage");
    }, [navigate]); 

    return (
        <div className="settings-container">
            <div className="settingslogoutpageChild" />
            <img
                className="deleteIcon"
                alt=""  
                src="/delete.svg"
                onClick={onDeleteIconClick} 
            />
            <div className="settings">Settings</div>
            <div className="button-group">
                <button className="settings-button" onClick={onChangePWClick}>Manage Password</button>
                <button className="settings-button">Safety</button>
                <button className="settings-button" onClick={onChangeAvatarClick}>Change Avatar</button>
            </div>
        </div>
    );
};





export default ProfileBufferPage;