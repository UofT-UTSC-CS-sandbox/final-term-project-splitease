import { useCallback } from "react";
import "./ProfileBufferPage.css";
import { useNavigate } from "react-router-dom";

const ProfileBufferPage = () => {
  const navigate = useNavigate();

  const onChangeAvatarClick = useCallback(() => {
    navigate("/profileeditorpage");
  }, [navigate]);

  const onChangePWClick = useCallback(() => {
    navigate("/changepasswordpage");
  }, [navigate]);

  const onBackButtonClick = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  return (
    <div className="settings-container">
      <div className="settingslogoutpageChild" />
      <img
        className="deleteIcon"
        alt=""
        src="/delete.svg"
        onClick={onBackButtonClick}
      />
      <div className="settings">Settings</div>
      <div className="button-group">
        <button className="settings-button" onClick={onChangePWClick}>
          Manage Password
        </button>
        <button className="settings-button">Safety</button>
        <button className="settings-button" onClick={onChangeAvatarClick}>
          Change Avatar
        </button>
      </div>
    </div>
  );
};

export default ProfileBufferPage;
