import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./GroupsPage.css";
import AddGroups from "../components/AddGroups";
import "../components/Universal.css";
import Swal from "sweetalert2";
import { parseTransactions, validateUser } from "../components/Functions.jsx";

const GroupsPage = () => {
  validateUser();
  const navigate = useNavigate();
  const [groups, setGroups] = useState([]);
  const [gids, setGroupIDs] = useState([]);
  const [isAddGroupsClicked, setIsAddGroupsClicked] = useState(false);
  const uid = localStorage.getItem("uid");

  const onAddGroupsClick = useCallback(() => {
    // navigate("/addgroups");
    setIsAddGroupsClicked(true);
  }, [navigate]);

  const onBackButtonClick = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const onGroupClick = useCallback(
    (e) => {
      // TODO: Display group details
      console.log("Group clicked:", e.currentTarget.id);
      navigate("/groupdetailpage/" + e.currentTarget.id);
    },
    [navigate]
  );

  const onCloseButton = (index) => {
    Swal.fire({
      title: "Warning!",
      text: "Are you sure you want to quit this group?",
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: "No",
      confirmButtonText: "Yes, quit",
    }).then((result) => {
      if (result.isConfirmed) {
        const groupToQuit = gids[index];
        console.log("the group going to be quit is:", groupToQuit);

        axios({
          method: "delete",
          url: "/group/quit",
          data: { uid, groupId: groupToQuit },
        })
          .then((res) => {
            const updatedGroups = groups.filter((_, i) => i !== index);
            setGroups(updatedGroups);
            navigate(0, { replace: true });
          })
          .catch((error) => {
            console.error("Error quiting group:", error);
            Swal.fire({
              title: "Error",
              text: "Failed to quit group. Please try again.",
              icon: "error",
            });
          });
      }
    });
  };

  useEffect(() => {
    if (uid) {
      axios
        .get(`/group/${uid}`)
        .then(async (response) => {
          console.log("Groups data:", response.data);
          const groupIds = response.data;
          setGroupIDs(groupIds);
          console.log("Groupids are:", groupIds);

          // Fetch group name & balance for each group ID
          const groupNameBalance = await Promise.all(
            groupIds.map(async (groupId) => {
              try {
                let res = await axios.get(`/group/name/of/${groupId}`);
                console.log("Group balance response:", res.data);
                const group_name = res.data.group_name;

                let balance = 0;

                try {
                  res = await axios.get(`/group/balance/${uid}/${groupId}`);
                  console.log("Group name response:", res.data);
                  balance = res.data;
                } catch (error) {
                  console.error(
                    `Error fetching group balance for group ID ${groupId}:`,
                    error
                  );
                  balance = 0;
                }
                return { group_name, balance };
              } catch (error) {
                console.error(
                  `Error fetching group name/balance for group ID ${groupId}:`,
                  error
                );
                return null;
              }
            })
          );

          // Filter out any null values in case of errors
          const validGroupNames = groupNameBalance.filter(
            (group) => group !== null
          );
          setGroups(validGroupNames);
        })
        .catch((error) => {
          console.log("Error fetching groups:", error);
        });
    }
  }, [uid]);

  return (
    <div className="pageContainer">
      <div className="headerBackground">
        <div className="headerText">Groups</div>
        <img
          className="deleteIcon"
          alt=""
          src="/delete.svg"
          onClick={onBackButtonClick}
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
              <div
                key={index}
                className="groupItem"
                onClick={onGroupClick}
                id={gids[index]}
              >
                <div
                  className="closeButton"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent triggering the onGroupClick event
                    onCloseButton(index);
                  }}
                >
                  x
                </div>
                <div className="groupText">{group.group_name}</div>
                <div className="balanceText">
                  {group.balance < 0 ? (
                    <span style={{ color: "green" }}>
                      -${Math.abs(group.balance).toFixed(2)}
                    </span>
                  ) : (
                    <span style={{ color: "red" }}>
                      ${group.balance.toFixed(2)}
                    </span>
                  )}
                </div>
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
