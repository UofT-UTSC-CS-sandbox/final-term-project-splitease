import { React, useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { parseTransactions } from "../components/Functions.jsx";
import "./GroupDetailPage.css";
import "../components/Universal.css";
import TransactionActivity from "../components/TransactionActivity.jsx";
import AddGroups from "../components/AddGroups.jsx";
import axios from "axios";
import Swal from "sweetalert2";

const GroupDetailPage = () => {
  const uid = localStorage.getItem("uid");
  const { gid } = useParams();
  const navigate = useNavigate();
  //test data for group
  // Test data for group members
  const testGroupMembers = ["Alice", "Bob", "Charlie"];
  const [isAddGroupsClicked, setIsAddGroupsClicked] = useState(false);
  // Get group details
  const [groupDetails, setGroupDetails] = useState({});
  const [groupMembers, setGroupMembers] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [showPopup, setShowPopup] = useState(false); // State for popup visibility
  const [newFriendName, setNewFriendName] = useState(""); // State for new friend's name

  useEffect(() => {
    const fetchGroupDetails = async () => {
      try {
        // Fetch group details
        const groupResponse = await axios.get(`/group/details/${gid}`);
        const groupData = groupResponse.data;

        // Fetch members' names
        const memberNames = await Promise.all(
          groupData.members.map(async (memberId) => {
            const userResponse = await axios.get(`/user/name/of/${memberId}`);
            return userResponse.data.name;
          })
        );

        setGroupDetails(groupData);
        setGroupMembers(memberNames);
        setTransactions(groupData.transactions);
      } catch (error) {
        console.error("Error fetching group details:", error);
      }
    };

    if (gid) {
      fetchGroupDetails();
    }
  }, [gid]);
  // test transactions for group

  const testTransactions = [
    {
      id: 1,
      date: "2024-07-15",
      name: "Lunch at Joe's",
      payerId: "user1",
      payer: "Alice",
      amount: 25.00,
    },
    {
      id: 2,
      date: "2024-07-16",
      name: "Movie Tickets",
      payerId: "user2",
      payer: "Bob",
      amount: -10.00,
    },
    {
      id: 3,
      date: "2024-07-17",
      name: "Grocery Shopping",
      payerId: "user1",
      payer: "Alice",
      amount: 50.00,
    },
  ];

  const UID_test = "user1";

  const friend_test = {
    name: "Bob",
  };
  const onDeleteIconClick = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const handleAddUserClick = () => {
    setShowPopup(true);
  };
  
  const handlePopupClose = () => {
    setShowPopup(false);
    setNewFriendName("");
  };
  
  const handleFriendNameChange = (e) => {
    setNewFriendName(e.target.value);
  };
  
  const handleAddFriend = async () => {
    // Implement the logic to add the new friend
    console.log("New friend name:", newFriendName);
    // Close the popup after adding the friend
    try {
      // Fetch friend's ID by name
      const friendResponse = await axios.get(`/user/id/of/${newFriendName}`);
      const friendId = friendResponse.data.user_id;
      console.log("Friend ID:", friendId);

      const inviteData = {
        id: uid,
        groupId: gid,
        friendId: friendId,
      };

      console.log("invite data is: ", inviteData);

      // Make POST request to invite friend to group
      const inviteResponse = await axios.post('/group/invite', inviteData);

      if (inviteResponse.status === 200) {
        // Update the group members list
        const updatedMembers = [...groupMembers, newFriendName];
        setGroupMembers(updatedMembers);
        console.info("Successfully invited friend to group");
      }

      handlePopupClose();
    } catch (error) {
      Swal.fire(
        "Error",
        "Failed to add friend to the group. Please try again.",
        "error"
      );
      console.error("Error inviting friend to group:", error);
    }
  };
  // TODO: display transaction details between each group member
  return (
    <div className="pageContainer">
      <div className="headerBackground">
        <div className="headerText">Group Transaction Details</div>
        <img
          className="deleteIcon"
          alt=""
          src="/delete.svg"
          onClick={onDeleteIconClick}
        />
      </div>
      <div className="group-members">
        <div className="group-balance">
          <img className="group-icon" alt="" src="/group.svg" />
          <h2>{groupDetails.name}</h2>
          <div className="member-list">
            {groupMembers.map((member, index) => (
              <div key={index} className="member-name">{member}</div>
            ))}
          </div>
          <img
              className="add-user-icon"
              alt="Add User"
              src="/group.svg"
              onClick={handleAddUserClick}
            />
          <div className="add-user-text">Add Friend</div>
        </div>
        <div className="recent-activities-text">Recent shared activities</div>
        <div className="recent-activities-bar">
          <TransactionActivity
            transactions={testTransactions}
            uid={UID_test}
            friendsInfo={friend_test}
          />
        </div>
      </div>
      {showPopup && (
  <div className="popup">
    <div className="popup-inner">
      <h3>Add a new friend</h3>
      <input
        type="text"
        placeholder="Enter friend's name"
        value={newFriendName}
        onChange={handleFriendNameChange}
      />
      <div className="popup-buttons">
        <button onClick={handleAddFriend}>Add</button>
        <button onClick={handlePopupClose}>Cancel</button>
      </div>
    </div>
  </div>
)}
    </div>
  );
};

export default GroupDetailPage;
