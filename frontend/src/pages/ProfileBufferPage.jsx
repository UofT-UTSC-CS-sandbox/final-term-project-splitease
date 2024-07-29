import { useCallback } from "react";
import "./ProfileBufferPage.css";
import "../components/Universal.css";
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
    <div className="pageContainer">
      <div className="headerBackground" />
      <div className="headerText">Account & Safety</div>
      <img
        className="deleteIcon"
        alt=""
        src="/delete.svg"
        onClick={onBackButtonClick}
      />
      <div className="button-group">
        <button className="settings-button" onClick={onChangePWClick}>
          Manage Password
        </button>
        <button className="settings-button" onClick={onChangeAvatarClick}>
          Change Avatar
        </button>
        <button className="settings-button">Safety</button>
      </div>
    </div>
  );
};

export default ProfileBufferPage;
