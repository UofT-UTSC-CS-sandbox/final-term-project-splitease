import { useState, useCallback } from "react";
import "./ProfileEditorPage.css";
import "../components/Universal.css";
import { useNavigate } from "react-router-dom";
import { parseTransactions, validateUser } from "../components/Functions.jsx";

const ProfileEditor = () => {
  validateUser();
  const [avatar, setAvatar] = useState("https://via.placeholder.com/245");

  // Function to handle the input of an avatar
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const navigate = useNavigate();
  const onBackButtonClick = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  return (
    <div className="pageContainer">
      <div className="headerBackground" />
      <div className="headerText">Upload Avatar</div>
      <img
        className="deleteIcon"
        alt=""
        src="/delete.svg"
        onClick={onBackButtonClick}
      />
      <div className="avatarsection">
        <img src={avatar} alt="Avatar" className="avatar" />
        <input type="file" accept="image/*" onChange={handleAvatarChange} />
      </div>
      <div className="name">Username: W</div>
    </div>
  );
};

export default ProfileEditor;
