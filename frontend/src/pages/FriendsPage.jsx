import { useCallback } from "react";
import "./FriendsPage.css";
import { useNavigate } from "react-router-dom";
import React, { useState } from 'react';

const FriendsPage = () => {
  const navigate = useNavigate();

  const onAddFriendsClick = useCallback(() => {
    navigate("/addfriends");
  });

  const onDeleteIconClick = useCallback(() => {
    navigate("/friendsgroupspage");
  }, [navigate]);

  return (
    <div className="friendspage">
      <div className="friendspageChild" />
      <div className="friendsHeader">Friends</div>
      <img
        className="deleteIcon"
        alt=""
        src="/delete.svg"
        onClick={onDeleteIconClick}
      />
      <button className="addfriends" onClick={onAddFriendsClick}>
        Add Friends
      </button>
    </div>
  );
};

export default FriendsPage;
