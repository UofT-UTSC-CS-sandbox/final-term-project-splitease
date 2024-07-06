import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./GroupsPage.css";
import AddGroups from "../components/AddGroups";

const GroupsPage = () => {
  const navigate = useNavigate();
  const [groups, setGroups] = useState([]);
  const [isAddGroupsClicked, setIsAddGroupsClicked] = useState(false);
  const uid = localStorage.getItem("uid");

  const onAddGroupsClick = useCallback(() => {
    // navigate("/addgroups");
    setIsAddGroupsClicked(true);
  }, [navigate]);

  const onDeleteIconClick = useCallback(() => {
    navigate("/friendsgroupspage");
  }, [navigate]);

  const onGroupClick = useCallback(() => {
    // TODO: Display group details
  }, [navigate]);

  const onCloseButton = (index) => {
    // Filter out the group to be deleted
    const updatedGroups = groups.filter((_, i) => i !== index);
    // Update the state with the new groups array
    setGroups(updatedGroups);
  };

  useEffect(() => {
    if (uid) {
      axios
        .get(`/group/${uid}`)
        .then(async (response) => {
          console.log("Groups data:", response.data);
          const groupIds = response.data;
          console.log("Groupids are:", groupIds);

          // Fetch group names for each group ID
          const groupNames = await Promise.all(
            groupIds.map(async (groupId) => {
              try {
                const res = await axios.get(`/group/name/of/${groupId}`);
                return res.data.group_name;
              } catch (error) {
                console.error(
                  `Error fetching group name for group ID ${groupId}:`,
                  error
                );
                return null;
              }
            })
          );

          // Filter out any null values in case of errors
          const validGroupNames = groupNames.filter((name) => name !== null);
          setGroups(validGroupNames);
        })
        .catch((error) => {
          console.log("Error fetching groups:", error);
        });
    }
  }, [uid]);

  return (
    <div className="groupspage">
      <div className="groupspageChild">
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
      {isAddGroupsClicked && (
        <AddGroups
          isAddGroupsClicked={isAddGroupsClicked}
          setIsAddGroupsClicked={setIsAddGroupsClicked}
        />
      )}
      <div className="groupsList">
        {groups.length > 0 ? (
          <>
            <div className="groupsListHeader">Your groups are:</div>
            {groups.map((group, index) => (
              <div key={index} className="groupItem" onClick={onGroupClick}>
                <div
                  className="closeButton"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent triggering the onGroupClick event
                    onCloseButton(index);
                  }}
                >
                  x
                </div>
                <div className="groupText">{group}</div>
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
