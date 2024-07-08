import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
import "./AddGroups.css";
import "../components/Universal.css";
import axios from "axios";
import Swal from "sweetalert2";

const AddGroups = ({ isAddGroupsClicked, setIsAddGroupsClicked }) => {
  const navigate = useNavigate();
  const [groupName, setGroupName] = useState("");
  const [members, setMembers] = useState([{ name: "", email: "" }]);
  const [groupType, setGroupType] = useState("");
  const [errors, setErrors] = useState({});

  const handleGroupNameChange = (e) => {
    setGroupName(e.target.value);
  };

  const handleMemberChange = (index, field, value) => {
    const newMembers = members.slice();
    newMembers[index][field] = value;
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
    // const userConfirmed = window.confirm(
    //   "Are you sure you want to create this group?"
    // );
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
            navigate(0, { replace: true });
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
              <input
                type="text"
                placeholder="Name"
                value={member.name}
                onChange={(e) =>
                  handleMemberChange(index, "name", e.target.value)
                }
              />
              {errors[`memberName${index}`] && (
                <div className="error">{errors[`memberName${index}`]}</div>
              )}
              <input
                type="email"
                placeholder="Email address (optional)"
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
            + Add a person
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
