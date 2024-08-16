import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
import "./AddGroups.css";
import "../components/Universal.css";
import axios from "axios";
import Swal from "sweetalert2";
import Select from "react-select";

const AddGroups = ({ isAddGroupsClicked, setIsAddGroupsClicked }) => {
  const navigate = useNavigate();
  const [groupName, setGroupName] = useState("");
  const [members, setMembers] = useState([{ name: "", email: "" }]);
  const [groupType, setGroupType] = useState("");
  const [friendsOptions, setFriendsOptions] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchFriends = async () => {
      const uid = localStorage.getItem("uid");
      try {
        const response = await axios.get(`/friend/of/${uid}`);
        const friends = response.data.friends || [];
        const friendDetailPromises = friends.map(async (friend) => {
          const friendResponse = await axios.get(`/user/name/of/${friend}`);
          return friendResponse.data;
        });
        const friendDetails = await Promise.all(friendDetailPromises);
        const friendOptions = friendDetails.map((friend) => ({
          id: response.data.friends[friendDetails.indexOf(friend)],
          label: friend.name,
        }));
        console.log("friendOptions: ", friendOptions);
        setFriendsOptions(friendOptions);
      } catch (error) {
        console.error("Error fetching friends:", error);
        Swal.fire({
          title: "Error!",
          text: "Error fetching friends!",
          icon: "error",
        });
      }
    };

    fetchFriends();
  }, []);

  const handleGroupNameChange = (e) => {
    setGroupName(e.target.value);
  };

  const handleMemberChange = (index, field, value) => {
    const newMembers = members.slice();
    if (field === "name") newMembers[index][field] = value ? value.label : "";
    else newMembers[index][field] = value;
    setMembers(newMembers);
  };

  const addMember = () => {
    setMembers([...members, { name: "", email: "" }]);
  };

  const removeMember = (index) => {
    setMembers(members.filter((_, i) => i !== index));
  };

  const handleGroupTypeChange = (e) => {
    setGroupType(e.target.value);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!groupName) {
      newErrors.groupName = "Group name is required";
    }

    if (!groupType) {
      newErrors.groupType = "Group type is required";
    }

    members.forEach((member, index) => {
      if (!member.name) {
        newErrors[`memberName${index}`] = "Member name is required";
      }
      if (
        member.email &&
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(member.email)
      ) {
        newErrors[`memberEmail${index}`] = "Invalid email address";
      }
    });

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      console.log("Form validation failed");
      return;
    }
    Swal.fire({
      title: "Are you sure?",
      text: "Are you sure you want to create this group?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const uid = localStorage.getItem("uid");
          const response = await axios.post(`/group/add/${uid}`, {
            id: uid,
            groupName,
            friends: members,
          });
          if (response.status === 200) {
            console.log("Group created successfully:", response.data);
            Swal.fire({
              title: "Success!",
              text: "Group created successfully",
              icon: "success",
            }).then(async (result) => {
              if (result.isConfirmed) {
                navigate(0, { replace: true });
              }
            });
          } else {
            console.error("Error creating group:", response.data.error);
          }
        } catch (error) {
          console.error("Error creating group:", error);
          if (error.response && error.response.status === 400) {
            console.error("Validation failed:", error.response.data);
            Swal.fire({
              title: "Error!",
              text: error.response.data.error,
              icon: "error",
            });
          }
        }
      } else {
        console.log("Group creation canceled");
      }
    });
  };

  const handleClose = useCallback(() => {
    Swal.fire({
      title: "Warning!",
      text: "Your changes will not be saved!",
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: "Stay",
    }).then((result) => {
      if (result.isConfirmed) {
        // Hide this component
        setIsAddGroupsClicked(false);
        // No need to refresh the friends list
      }
    });
  }, [navigate]);

  if (!isAddGroupsClicked) {
    return null;
  }

  return (
    <div className="add-groups-container">
      <div className="add-groups-header">
        <div className="add-groups-title">CREATE A NEW GROUP</div>
        <div className="close-button" onClick={handleClose}>
          ×
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="add-groups-input"
          placeholder="Group Name"
          value={groupName}
          onChange={handleGroupNameChange}
        />
        {errors.groupName && <div className="error">{errors.groupName}</div>}
        <div className="add-groups-members">
          <div>GROUP MEMBERS</div>
          {members.map((member, index) => (
            <div key={index} className="add-groups-member">
              <div className="autocomplete-container">
                <Select
                  options={friendsOptions}
                  value={member.friend}
                  className="select-member"
                  onChange={(selectedOption) =>
                    handleMemberChange(index, "name", selectedOption)
                  }
                  placeholder="Select a friend"
                  isClearable
                  style={{ flex: 1, marginRight: "8px" }}
                />
                {errors[`memberName${index}`] && (
                  <div className="error">{errors[`memberName${index}`]}</div>
                )}
              </div>
              <input
                type="email"
                placeholder="Email (optional)"
                value={member.email}
                onChange={(e) =>
                  handleMemberChange(index, "email", e.target.value)
                }
              />
              {errors[`memberEmail${index}`] && (
                <div className="error">{errors[`memberEmail${index}`]}</div>
              )}
              <div
                className="remove-member"
                onClick={() => removeMember(index)}
              >
                ×
              </div>
            </div>
          ))}
          <div className="add-groups-add-member" onClick={addMember}>
            + Add a member
          </div>
        </div>
        <div className="add-groups-group-type">
          <div>GROUP TYPE</div>
          <select value={groupType} onChange={handleGroupTypeChange}>
            <option value="">No selection</option>
            <option value="Family">Family</option>
            <option value="Roommate">Roommate</option>
            <option value="Company Trip">Company Trip</option>
            <option value="Meal Pal">Meal Pal</option>
            <option value="Other">Other</option>
          </select>
          {errors.groupType && <div className="error">{errors.groupType}</div>}
        </div>
        <button type="submit" className="add-groups-save-button">
          Save
        </button>
      </form>
    </div>
  );
};

export default AddGroups;
