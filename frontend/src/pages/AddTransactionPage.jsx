import { useCallback, useState } from "react";
import { useEffect } from "react";
import "./AddTransactionPage.css";
import "../components/Universal.css";
import { parseTransactions, validateUser } from "../components/Functions.jsx";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import Modal from "react-modal";

const AddTransactionPage = () => {
  validateUser();
  const navigate = useNavigate();
  const uid = localStorage.getItem("uid");
  const [payAmount, setPayAmount] = useState("");
  const [type, setType] = useState("");
  const [methodType, setMethodType] = useState("");
  const [errors, setErrors] = useState({
    type: "",
    inputValue: "",
    amount: "",
    methodType: "",
  });
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [splitMethod, setSplitMethod] = useState("Evenly"); // State for split method
  const [FGMethod, setFGMethod] = useState("Friend"); // State for FG method
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [amounts, setAmounts] = useState(Array(5).fill(""));
  const [showTotal, setShowTotal] = useState(false);
  const [friendName, setFriendName] = useState("");
  const [memberCount, setMemberCount] = useState(0);
  const [groupID, setGroupID] = useState("");
  const [totalAmount, setTotalAmount] = useState((0).toFixed(2));

  const handleInputChange = async (e) => {
    const value = e.target.value;
    setInputValue(value);
    if (value && FGMethod == "Friend") {
      try {
        const response = await axios.get(`/user/partial/${value}`);
        console.log("suggestions are: ", response.data);
        console.log("suggestions are: ", response.data);
        const users = response.data.users || [];
        const userNames = users.map((user) => user.name);
        setSuggestions(userNames);
      } catch (error) {
        console.error("Error fetching user suggestions:", error);
        setSuggestions([]);
      }
    } else if (value && FGMethod == "Group") {
      try {
        const response = await axios.get(`/group/partial/${value}`);
        console.log("suggestions are: ", response.data);
        console.log("suggestions are: ", response.data);
        const groups = response.data || [];
        const groupNames = groups.map((group) => group.name);
        setSuggestions(groupNames);
      } catch (error) {
        console.error("Error fetching gruop suggestions:", error);
        setSuggestions([]);
      }
    }
  };

  const onSuggestionClick = (suggestion) => {
    setInputValue(suggestion);
    setFriendName(suggestion);
    setSuggestions([]);
  };

  const handleMethodTypeChange = (e) => {
    setMethodType(e.target.value);
  };

  const handleAmountChange = (e) => {
    setPayAmount(e.target.value);
  };

  const handleTypeChange = (e) => {
    setType(e.target.value);
  };

  const handleFGChange = (method) => {
    setFGMethod(method);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setTotalAmount((0).toFixed(2));
  };

  const handleInputAmountChange = (index, event) => {
    const newAmounts = [...amounts];
    newAmounts[index] = event.target.value;
    setAmounts(newAmounts);
    setTotalAmount(
      newAmounts
        .reduce((sum, amount) => {
          const value = parseFloat(amount);
          return sum + (isNaN(value) ? 0 : value);
        }, 0)
        .toFixed(2)
    );
  };

  const fetchGroupID = async (groupName) => {
    try {
      const response = await axios.get(`/group/id/of/${groupName}`);
      console.log("group id is: ", response.data);
      return response.data.group_id;
    } catch (error) {
      console.error("Error fetching group id:", error);
      return null;
    }
  };

  const fetchMemberCount = async (groupId) => {
    try {
      const response = await axios.get(`/group/details/${groupId}`);
      console.log("group details are: ", response.data);
      const group = response.data;
      return group.members.length;
    } catch (error) {
      console.error("Error fetching group details:", error);
      return 0;
    }
  };

  const calculateTotalAmount = async (memberCount) => {
    if (FGMethod === "Friend") {
      if (splitMethod === "Evenly") {
        return (parseFloat(payAmount) / 2).toFixed(2);
      } else {
        const total = amounts.reduce((sum, amount) => {
          const value = parseFloat(amount);
          return sum + (isNaN(value) ? 0 : value);
        }, 0);
        return total.toFixed(2);
      }
    } else {
      if (splitMethod === "Evenly") {
        return (parseFloat(payAmount) / memberCount).toFixed(2);
      } else {
        const total = amounts.reduce((sum, amount) => {
          const value = parseFloat(amount);
          return sum + (isNaN(value) ? 0 : value);
        }, 0);
        return total.toFixed(2);
      }
    }
  };

  const handleSplitMethodChange = (method) => {
    setShowTotal(true);
    setSplitMethod(method);
    if (method === "Other") {
      setIsModalOpen(true);
    }
  };

  const handleConfirmSplit = () => {
    // Handle confirm logic here
    setIsModalOpen(false);
    setShowTotal(true);
  };

  const onConfirmClick = useCallback(async () => {
    const amount = document.getElementById("amount").value;
    const newErrors = {};

    if (!type) {
      newErrors.type = "Please select a type.";
    }
    if (!inputValue) {
      newErrors.inputValue = "Please select a group or friend.";
    }
    if (!amount) {
      newErrors.amount = "Please enter an amount.";
    }
    if (!methodType) {
      newErrors.methodType = "Please select a method.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const description = type;
    const uid = localStorage.getItem("uid");

    if (!uid) {
      Swal.fire({
        title: "Oops...",
        text: "You need to log in first!",
        icon: "error",
      }).then(() => {
        navigate("/login");
      });
      return;
    }

    console.log("method is: ", FGMethod);

    Swal.fire({
      title: "Are you sure?",
      text: "Are you sure you want to create this transaction?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then(async (result) => {
      if (result.isConfirmed) {
        if (FGMethod === "Friend") {
          try {
            // Fetch the friend's UID using inputValue
            const friendResponse = await axios.get(`/user/id/of/${inputValue}`);
            const friendUid = friendResponse.data.user_id;

            if (!friendUid) {
              Swal.fire({
                title: "Oops...",
                text: "Friend not found!",
                icon: "error",
              });
              return;
            } else if (friendUid == uid) {
              Swal.fire({
                title: "Oops...",
                text: "You cannot add yourself as a friend!",
                icon: "error",
              });
              return;
            }

            // Create the transaction data with both UIDs
            const friends = [friendUid];

            // Post the transaction data
            const response = await axios.post(`/transaction/add`, {
              uid,
              amount,
              description,
              friends,
            });

            if (response.data.error) {
              alert(response.data.error);
            } else {
              navigate("/"); // Redirect to the main page
            }
          } catch (error) {
            console.error(
              "Error fetching friend UID or creating transaction:",
              error
            );
            Swal.fire({
              title: "Error!",
              text: "Friend not found!",
              icon: "error",
            });
          }
        } else if (FGMethod === "Group") {
          try {
            // Fetch the friend's UID using inputValue
            const groupResponse = await axios.get(`/group/id/of/${inputValue}`);
            const groupId = groupResponse.data.group_id;
            console.log("groupid is: ", groupId);

            if (!groupId) {
              Swal.fire({
                title: "Oops...",
                text: "Group not found!",
                icon: "error",
              });
              return;
            }

            // Post the transaction data
            const response = await axios.post(`/transaction/add/group`, {
              uid,
              amount,
              description,
              groupId,
            });

            console.log("response is: ", response);

            if (response.data.error) {
              alert(response.data.error);
            } else {
              navigate("/"); // Redirect to the main page
            }
          } catch (error) {
            console.error(
              "Error fetching groupid or creating transaction:",
              error
            );
            Swal.fire({
              title: "Error!",
              text: "Group not found!",
              icon: "error",
            });
          }
        }
      }
    });
  }, [inputValue, methodType, type, uid, navigate]);

  const onBackButtonClick = useCallback(() => {
    Swal.fire({
      title: "Warning!",
      text: "Are you sure you want to quit? Your changes will not be saved!",
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: "No",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate(-1);
      }
    });
  }, [navigate]);

  useEffect(() => {
    const fetchData = async () => {
      const groupID = await fetchGroupID(inputValue);
      setGroupID(groupID);

      const count = await fetchMemberCount(groupID);
      setMemberCount(count);
      const total = await calculateTotalAmount(count);
      setTotalAmount(total);
    };

    fetchData();
  }, [inputValue, FGMethod, splitMethod, payAmount, amounts]);

  return (
    <div className={"pageContainer"}>
      <div className={"headerBackground"} />
      <div className={"headerText"}>Add a Transaction</div>
      <img
        className={"deleteIcon"}
        alt=""
        src="/delete.svg"
        onClick={onBackButtonClick}
      />
      <div className={"selectATeam"}>
        Choose a friend or group to share this bill
      </div>
      <div className="autocomplete-container">
        <input
          type="text"
          className="autocomplete-input"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Start typing to search..."
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
        {memberCount.length > 0 && (
          <ul>
            {memberCount.map((group) => (
              <li key={group.groupId}>
                {group.groupName} - {group.memberCount} members
              </li>
            ))}
          </ul>
        )}
        {errors.inputValue && <div className="error">{errors.inputValue}</div>}
      </div>
      <div className="method-buttons">
        <button
          className={FGMethod === "Friend" ? "active" : ""}
          onClick={() => handleFGChange("Friend")}
        >
          Friend
        </button>
        <button
          className={FGMethod === "Group" ? "active" : ""}
          onClick={() => handleFGChange("Group")}
        >
          Group
        </button>
      </div>

      <img className={"lineIcon"} alt="" src="/line-1.svg" />
      <img className={"line"} alt="" />

      <div className="selection-box">
        <div className="select">Choose a payment type</div>
        <select value={type} onChange={handleTypeChange}>
          <option value="">No selection</option>
          <option value="Food">Food</option>
          <option value="Movie">Movie</option>
          <option value="Shopping">Shopping</option>
          <option value="Travel">Travel</option>
          <option value="Transportation">Transportation</option>
          <option value="Recreation">Recreation</option>
          <option value="Other">Other</option>
        </select>
        {errors.type && <div className="error">{errors.type}</div>}
      </div>
      <img className={"lineIcon"} alt="" src="/line-1.svg" />
      <img className={"line"} alt="" />
      <div className="amountText">Amount</div>
      <div className={"amountInput"}>
        <input
          className={"input"}
          type="text"
          placeholder="Enter Amount"
          id="amount"
          value={payAmount}
          onChange={handleAmountChange}
        />
        {errors.amount && <div className="error">{errors.amount}</div>}
      </div>
      <img className={"lineIcon"} alt="" src="/line-1.svg" />
      <img className={"line"} alt="" />
      <div className="selection-box">
        <div className={"chooseAMethod"}>Choose a method to pay this bill</div>
        <select value={methodType} onChange={handleMethodTypeChange}>
          <option value="">No selection</option>
          <option value="Cash">Cash</option>
          <option value="Check">Check</option>
          <option value="Credit Card">Credit Card</option>
          <option value="Debit Card">Debit Card</option>
          <option value="Apple Pay">Apple Pay</option>
          <option value="PayPal">PayPal</option>
          <option value="AliPay">AliPay</option>
          <option value="WeChat Pay">WeChat Pay</option>
          <option value="Other">Other</option>
        </select>
        {errors.methodType && <div className="error">{errors.methodType}</div>}
        <div className={"chooseAMethod"}>
          Choose a method to split this bill
        </div>
        <div className="method-buttons">
          <button
            className={splitMethod === "Evenly" ? "active" : ""}
            onClick={() => handleSplitMethodChange("Evenly")}
          >
            Evenly
          </button>
          <button
            className={splitMethod === "Other" ? "active" : ""}
            onClick={() => handleSplitMethodChange("Other")}
          >
            Input your split
          </button>
        </div>
      </div>
      {showTotal && (
        <div className="youWillPay">You will pay a total of ${totalAmount}</div>
      )}
      <div className={"confirm"} onClick={onConfirmClick}>
        Confirm
      </div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleModalClose}
        contentLabel="Custom Split"
        ariaHideApp={false}
        className="custom-modal"
      >
        {FGMethod === "Friend" ? (
          <div>
            <h2>Enter Split Details for Friend</h2>
            {[...Array(1)].map((_, index) => (
              <div key={index} className="split-detail-row">
                <input type="text" value={friendName} readOnly />
                <input
                  type="text"
                  placeholder="Amount"
                  value={amounts[index]}
                  onChange={(e) => handleInputAmountChange(index, e)}
                />
              </div>
            ))}
            <div className="modal-buttons">
              <button onClick={handleModalClose}>Close</button>
              <button onClick={handleConfirmSplit}>Confirm</button>
            </div>
          </div>
        ) : (
          <div>
            <h2>Enter Split Details for Group</h2>
            {[...Array(memberCount > 0 ? memberCount - 1 : 0)].map((_, index) => (
              <div key={index} className="split-detail-row">
                <input type="text" placeholder="Group member" />
                <input
                  type="text"
                  placeholder="Amount"
                  value={amounts[index]}
                  onChange={(e) => handleInputAmountChange(index, e)}
                />
              </div>
            ))}
            <div className="modal-buttons">
              <button onClick={handleModalClose}>Close</button>
              <button onClick={handleConfirmSplit}>Confirm</button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default AddTransactionPage;
