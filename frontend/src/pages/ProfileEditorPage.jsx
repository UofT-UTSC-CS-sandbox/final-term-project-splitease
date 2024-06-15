import { useState, useCallback } from 'react';
import styles from './ProfileEditorPage.module.css';
import { useNavigate } from "react-router-dom";

const ProfileEditor = () => {
  const [avatar, setAvatar] = useState('https://via.placeholder.com/245');

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
    navigate("/");
  }, [navigate]);

  return (
    <div className={styles.editor}>
      <div className={styles.profileEditorInner} />
      <img
        className={styles.deleteIcon}
        alt=""
        src="/delete.svg"
        onClick={onDeleteIconClick}
      />
      <div className={styles.uploadImage}>Upload Image</div>
    
      <div className={styles.avatarsection}>
        <img src={avatar} alt="Avatar" className={styles.avatar} />
        <input type="file" accept="image/*" onChange={handleAvatarChange} />
      </div>
      <div className={styles.name}>Name: Zheyuan Wei</div>
    </div>
  );
};

export default ProfileEditor;
