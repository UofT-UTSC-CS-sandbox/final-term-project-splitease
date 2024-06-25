import { useCallback } from "react";
import "./FriendsGroupsPage.css";
import { useNavigate } from "react-router-dom";

const FriendsGroupsPage = () => {
  const navigate = useNavigate();
  const onDeleteIconClick = useCallback(() => {
    navigate("/");
  }, [navigate]);

  const onFriendsPageClick = useCallback(() => {
    navigate("/friendspage");
  }, [navigate]);

  const onGroupsPageClick = useCallback(() => {
    navigate("/groupspage");
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
        <img className="friendsarrowRightIcon" alt="" src="/arrowright.svg" onClick={onFriendsPageClick}/>
        <div className="friends">Friends</div>
      </div>

      <div className="groupsBox">
        <img className="groupsarrowRightIcon" alt="" src="/arrowright1.svg" onClick={onGroupsPageClick}/>
        <div className="groups">Groups</div>
      </div>
      
    </div>
  );
};

export default FriendsGroupsPage;
