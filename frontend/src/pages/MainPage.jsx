import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './MainPage.module.css';

const MainPage = () => {
  const navigate = useNavigate();

  const button_functionpage = () => {
    navigate('/functionselectionpage');
  };

  return (
    <div className={styles.mainPage}> {/* Use camelCase here */}
      <div className={styles.userDashboard}>
        <a className={styles.helloMess}>Hello!!!!</a> 
        <img
            className={styles.arrowRightIcon}
            loading="lazy"
            alt=""
            src="/arrowright1.svg"
            onClick={button_functionpage}
          />
        </div> {/* Use camelCase here */}
    </div>
  );
};

export default MainPage;
