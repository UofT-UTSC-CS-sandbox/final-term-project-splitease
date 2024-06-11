import React from 'react';
import { useNavigate } from 'react-router-dom';
import './MainPage.module.css'; // Importing CSS for styling

const MainPage = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/functionselectionpage');
  };

  return (
    <div className="main-page">
      <h1>Main Page</h1>
      <button onClick={handleButtonClick}>Go to Function Selection Page</button>
    </div>
  );
};

export default MainPage;
