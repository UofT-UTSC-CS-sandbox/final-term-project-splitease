import { useCallback, useState } from "react";
import "./AddTransactionPage.css";
import "../components/Universal.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const AddTransactionPage = () => {
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

  // TODO: Do not pull all user list at once
  // Instead, use `get user/partial/:name` to query filtered user list
  const allChoices = [
    "Apple",
    "Banana",
    "Orange",
    "Mango",
    "Pineapple",
    "Grapes",
  ];

  const handleInputChange = async (e) => {
    const value = e.target.value;
    setInputValue(value);
    if (value) {
      // const filteredChoices = allChoices.filter((choice) =>
      //   choice.toLowerCase().includes(value.toLowerCase())
      // );
      try {
        const response = await axios.get(`/user/partial/${value}`);
        console.log("suggestions are: ", response.data );
        const users = response.data.users || [];
        const userNames = users.map(user => user.name);
        setSuggestions(userNames);
        // setSuggestions(allChoices);
      } catch (error) {
        console.error("Error fetching user suggestions:", error);
        setSuggestions([]);
      }
    }
      // setSuggestions(allChoices);
     else {
      setSuggestions([]);
    }
  };

  const onSuggestionClick = (suggestion) => {
    setInputValue(suggestion);
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

  const onConfirmTextClick = useCallback(async () => {
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

    const description = "TransDescFoo";
    const id = localStorage.getItem("uid");

    if (!id) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "You need to log in first!",
      }).then(() => {
        navigate("/login");
      });
      return;
    }

    try {
      // Fetch the friend's UID using inputValue
      const friendResponse = await axios.get(`/user/id/of/${inputValue}`);
      const friendUid = friendResponse.data.user_id;

      if (!friendUid) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Friend not found!",
        });
        return;
      }

      // Create the transaction data with both UIDs
      const transactions = [
        {
          group_id: 1,
          friends: [friendUid, uid],
          amount: parseFloat(amount),
        },
      ];

      // Post the transaction data
      const response = await axios.post(`/transaction/add/${id}`, {
        description,
        transactions,
      });

      if (response.data.error) {
        alert(response.data.error);
      } else {
        navigate("/"); // Redirect to the main page
      }
    } catch (error) {
      console.error("Error fetching friend UID or creating transaction:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "An error occurred while processing the transaction.",
      });
    }
  }, [inputValue, methodType, type, uid, navigate]);

  const onBackButtonClick = useCallback(() => {
    Swal.fire({
      title: "Warning!",
      text: "Are you sure you want to quit? Your changes will not be saved.",
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
        {errors.inputValue && <div className="error">{errors.inputValue}</div>}
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
        <div className={"chooseAMethod"}>
          Choose a method to split this bill
        </div>
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
      </div>
      <div className={"youWillPay"}>
        You will pay a total of ${parseFloat(payAmount).toFixed(2)}
      </div>
      <div className={"confirm"} onClick={onConfirmTextClick}>
        Confirm
      </div>
    </div>
  );
};

export default AddTransactionPage;
