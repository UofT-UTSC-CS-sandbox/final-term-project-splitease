import { useState, useCallback } from 'react';
import './ProfileEditorPage.css';
import { useNavigate } from "react-router-dom";

const ProfileEditor = () => {
  const [avatar, setAvatar] = useState('https://via.placeholder.com/245');

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
  const onDeleteIconClick = useCallback(() => {
    navigate("/settingslogoutpage");
  }, [navigate]);

  return (
    <div className="editor">
      <div className="profileEditorInner" />
      <img
        className="deleteIcon"
        alt=""
        src="/delete.svg"
        onClick={onDeleteIconClick}
      />
      <div className="uploadAvatar">Upload Avatar</div>
    
      <div className="avatarsection">
        <img src={avatar} alt="Avatar" className="avatar" />
        <input type="file" accept="image/*" onChange={handleAvatarChange} />
      </div>
      <div className="name">Username: W</div>
    </div>
  );
};

export default ProfileEditor;
