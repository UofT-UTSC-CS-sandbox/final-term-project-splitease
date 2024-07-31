import { React, useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./GroupDetailPage.css";
import "../components/Universal.css";
import TransactionActivity from "../components/TransactionActivity.jsx";
import AddGroups from "../components/AddGroups.jsx";
import axios from "axios";
import Swal from "sweetalert2";
import { parseTransactions, validateUser } from "../components/Functions.jsx";

const GroupDetailPage = () => {
  validateUser();
  const uid = localStorage.getItem("uid");
  const { gid } = useParams();
  const navigate = useNavigate();

  // Get group details
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [groupDetails, setGroupDetails] = useState({});
  const [groupMembers, setGroupMembers] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [showPopup, setShowPopup] = useState(false); // State for popup visibility
  const [newFriendName, setNewFriendName] = useState(""); // State for new friend's name
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [errors, setErrors] = useState({
    type: "",
    inputValue: "",
    amount: "",
    methodType: "",
  });

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
      amount: 25.0,
    },
    {
      id: 2,
      date: "2024-07-16",
      name: "Movie Tickets",
      payerId: "user2",
      payer: "Bob",
      amount: -10.0,
    },
    {
      id: 3,
      date: "2024-07-17",
      name: "Grocery Shopping",
      payerId: "user1",
      payer: "Alice",
      amount: 50.0,
    },
  ];

  const UID_test = "user1";

  const friend_test = {
    name: "Bob",
  };

  async function fetchFriendIds(uid) {
    const response = await axios.get(`/friend/of/${uid}`);
    console.log(response);
    // if (!response.ok) {
    //   throw new Error("Failed to fetch friend IDs");
    // }
    const data = await response.data.friends;
    console.log("The friend id data is: ", data);
    return data;
  }
  
  async function fetchUserNameById(id) {
    const response = await axios.get(`/user/name/of/${id}`);
    // if (!response.ok) {
    //   throw new Error("Failed to fetch user name");
    // }
    console.log("The reponse is:", response );
    const data = await response.data;
    return data.name;
  }

  const handleInputChange = async (e) => {
    const value = e.target.value;
    setInputValue(value);
    if (value) {
      try {
        const response = await axios.get(`/friend/partial/${uid}/${value}`);
        console.log("suggestions are: ", response.data);
        console.log("suggestions are: ", response.data);
        const users = response.data.friends || [];
        console.log("users are: ", users);
        const userNames = users.map((user) => user.name);
        setSuggestions(userNames);
      } catch (error) {
        console.error("Error fetching user suggestions:", error);
        setSuggestions([]);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleClickChange = async () => {
    // const value = e.target.value;
    // setInputValue(value);
    try {
      // Get the list of friend IDs
      const friendIds = await fetchFriendIds(uid);
      console.log("FriendIds are:", friendIds);
  
      // Fetch all friend names concurrently
      const friendNamesPromises = friendIds.map((id) => fetchUserNameById(id));
      const friendNames = await Promise.all(friendNamesPromises);
  
      // Set the suggestions with the friend names
      setSuggestions(friendNames);
    } catch (error) {
      console.error("Error setting friend suggestions:", error);
    }
  };

  const handleEventChange = async (e) => {
    if (inputValue === "") {
      handleClickChange();
    }
    else {
      handleInputChange(e);
    }
  }

  const onSuggestionClick = (suggestion) => {
    setInputValue(suggestion);
    setSuggestions([]);
  };

  const onDeleteIconClick = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const handlePopupClose = () => {
    setShowPopup(false);
    setInputValue("");
  };

  // const handleFriendNameChange = (e) => {
  //   setNewFriendName(e.target.value);
  // };

  const handleAddUserClick = () => {
    setShowPopup(true);
  };

  // TODO: Implement the logic to delete group
    const handleDeleteGroupClick = () => {
      // Handle delete group click
      console.log("Delete Group clicked");
      Swal.fire({
        title: "Warning!",
        text: "Are you sure you want to delete this group?",
        icon: "warning",
        showCancelButton: true,
        cancelButtonText: "No",
        confirmButtonText: "Yes, delete",
      }).then((result) => {
        if (result.isConfirmed) {
          // Delete the group
          axios({
            method: "delete",
            url: "/group/delete/",
            data: {uid, groupId: gid},
          })
          .then ((res) => {
            console.log("The result is: ", res);
            navigate(-1); // Redirect to groups page
          })
          .catch((error) => {
            console.error("Error deleting group:", error);
            Swal.fire(
              "Error",
              "Failed to delete group. Please try again.",
              "error"
            );
          });
        }
      });
    };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleAddFriend = async () => {
    // Implement the logic to add the new friend
    console.log("New friend name:", inputValue);
    // Close the popup after adding the friend
    try {
      // Fetch friend's ID by name
      const friendResponse = await axios.get(`/user/id/of/${inputValue}`);
      const friendId = friendResponse.data.user_id;
      console.log("Friend ID:", friendId);

      const inviteData = {
        id: uid,
        groupId: gid,
        friendId: friendId,
      };

      console.log("invite data is: ", inviteData);

      // Make POST request to invite friend to group
      const inviteResponse = await axios.post("/group/invite", inviteData);

      if (inviteResponse.status === 200) {
        // Update the group members list
        const updatedMembers = [...groupMembers, inputValue];
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
        <button className="actions-button" onClick={toggleDropdown}>
          <img className="add-user-icon" alt="Add User" src="/group.svg" />
          Actions
        </button>
        {isDropdownOpen && (
          <div className="dropdown-menu">
            <div className="dropdown-item" onClick={handleAddUserClick}>
              Add Friend
            </div>
            <div className="dropdown-item" onClick={handleDeleteGroupClick}>
              Delete Group
            </div>
          </div>
        )}
      </div>
      <div className="group-balance">
        <div className="group-header">
          <img className="group-icon" alt="" src="/group.svg" />
          <h2>{groupDetails.name}</h2>
        </div>
        {groupMembers.map((member, index) => (
          <div key={index} className="member-name">
            {member}
          </div>
        ))}
      </div>
      <div className="group-recent-activities-container">
        <h2>Recent shared activities</h2>
        <div className="group-recent-activities-bar">
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
            {/* <input
              type="text"
              placeholder="Enter friend's name"
              value={newFriendName}
              onChange={handleFriendNameChange}
            /> */}
        <div className="autocomplete-container">
        <input
          type="text"
          className="autocomplete-input"
          value={inputValue}
          onChange={handleInputChange}
          onClick={handleEventChange}
          placeholder="Enter friend's name"
        />
        {suggestions.length > 0 && (
          <ul className="suggestions-list">
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                className="suggestion-item"
                onClick={() => onSuggestionClick(suggestion)}
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
        {errors.inputValue && <div className="error">{errors.inputValue}</div>}
      </div>
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
