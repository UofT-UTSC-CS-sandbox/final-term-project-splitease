import { useCallback } from "react";
import "./FriendsGroupsPage.css";
import { useNavigate } from "react-router-dom";

const FriendsGroupsPage = () => {
  const navigate = useNavigate();
  const onDeleteIconClick = useCallback(() => {
    navigate("/");
  }, [navigate]);

  return (
    <div className="friendsgroupspage">
      <div className="friendsgroupspageChild" />
      <div className="friendsGroups">Friends & Groups</div>
      <img
        className="deleteIcon"
        alt=""
        src="/delete.svg"
        onClick={onDeleteIconClick}
      />
      <div className="friendsBox">
        <img className="friendsarrowRightIcon" alt="" src="/arrowright.svg" />
        <div className="friends">Friends</div>
      </div>

      <div className="groupsBox">
        <img className="groupsarrowRightIcon" alt="" src="/arrowright1.svg" />
        <div className="groups">Groups</div>
      </div>
      
    </div>
  );
};

export default FriendsGroupsPage;
