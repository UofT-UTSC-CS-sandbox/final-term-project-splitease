import { useCallback } from "react";
import "./GroupsPage.css";
import { useNavigate } from "react-router-dom";
import React, { useState } from 'react';

const GroupsPage = () => {
  const navigate = useNavigate();

  const onAddGroupsClick = useCallback(() => {
    navigate("/addgroups");
  });

  const onDeleteIconClick = useCallback(() => {
    navigate("/friendsgroupspage");
  }, [navigate]);

  return (
    <div className="groupspage">
      <div className="groupspageChild" />
      <div className="groupsHeader">Groups</div>
      <img
        className="deleteIcon"
        alt=""
        src="/delete.svg"
        onClick={onDeleteIconClick}
      />
      <button className="addgroups" onClick={onAddGroupsClick}>
        Create Groups
      </button>
    </div>
  );
};

export default GroupsPage;
