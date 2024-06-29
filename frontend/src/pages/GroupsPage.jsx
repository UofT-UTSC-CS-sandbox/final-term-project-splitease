import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./GroupsPage.css";

const GroupsPage = () => {
  const navigate = useNavigate();
  const [groups, setGroups] = useState([]);
  const uid = localStorage.getItem("uid");

  const onAddGroupsClick = useCallback(() => {
    navigate("/addgroups");
  }, [navigate]);

  const onDeleteIconClick = useCallback(() => {
    navigate("/friendsgroupspage");
  }, [navigate]);

  useEffect(() => {
    if (uid) {
      axios
        .get(`/user/group/${uid}`)
        .then(async (response) => {
          console.log("Groups data:", response.data);
          const groupIds = response.data;
          console.log("Groupids are:", groupIds);

          // Fetch group names for each group ID
          const groupNames = await Promise.all(
            groupIds.map(async (groupId) => {
              try {
                const res = await axios.get(`/user/groupname/of/${groupId}`);
                return res.data.group_name;
              } catch (error) {
                console.error(`Error fetching group name for group ID ${groupId}:`, error);
                return null;
              }
            })
          );

          // Filter out any null values in case of errors
          const validGroupNames = groupNames.filter(name => name !== null);
          setGroups(validGroupNames);
        })
        .catch((error) => {
          console.log("Error fetching groups:", error);
        });
    }
  }, [uid]);

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
      <div className="groupsList">
        {groups.length > 0 ? (
          <>
            <div className="groupsListHeader">Your groups are:</div>
            {groups.map((group, index) => (
              <div key={index} className="groupItem">
                {group}
              </div>
            ))}
          </>
        ) : (
          <div className="noGroups">You have no groups</div>
        )}
      </div>
    </div>
  );
};

export default GroupsPage;


