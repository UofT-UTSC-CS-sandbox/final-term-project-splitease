import { useCallback, useEffect, useState } from "react";
import "./FriendsPage.css";
import "../components/Universal.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AddFriends from "../components/AddFriends";
import Swal from "sweetalert2";

const FriendsPage = () => {
  const navigate = useNavigate();
  const [isAddFriendsOpen, setIsAddFriendsOpen] = useState(false);

  const uid = localStorage.getItem("uid");
  console.log("My UID is:", uid);

  const [friends, setFriends] = useState([]);
  const [fids, setFriendIDs] = useState([]);

  const onAddFriendsClick = useCallback(() => {
    // navigate("/addfriends");
    setIsAddFriendsOpen(true);
  }, [navigate]);

  const onBackButtonClick = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const onFriendClick = useCallback(
    (e) => {
      // TODO: Display friend details in a dedicated page
      const fid = e.currentTarget.id;
      navigate("/frienddetailpage/" + fid);
    },
    [navigate]
  );

  const onCloseButton = (index) => {
    Swal.fire({
      title: "Warning!",
      text: "Are you sure you want to delete this friend?",
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: "No",
      confirmButtonText: "Yes, delete",
    }).then((result) => {
      if (result.isConfirmed) {
        const friendToDelete = fids[index];
        console.log("the friend going to be deleted is:", friendToDelete);

        axios({
          method: "delete",
          url: "/friend/delete",
          data: { uid, fid: friendToDelete },
        })
          .then((res) => {
            const updatedFriends = friends.filter((_, i) => i !== index);
            setFriends(updatedFriends);
            navigate(0, { replace: true });
          })
          .catch((error) => {
            console.error("Error deleting friend:", error);
            Swal.fire(
              "Error",
              "Failed to delete friend. Please try again.",
              "error"
            );
          });
      }
    });
  };

  useEffect(() => {
    if (!uid) {
      console.error("User ID not found");
      navigate("/login");
      return;
    }

    axios
      .get(`/friend/of/${uid}`)
      .then(async (response) => {
        console.log("Friends data:", response.data);

        // Map over friend IDs to fetch names
        const friendIds = response.data.friends;
        setFriendIDs(friendIds);
        console.log("Friends ids:", friendIds);

        // Get the name of the friend
        const friendNameBalancePromises = friendIds.map(async (friendId) => {
          try {
            const nameResponse = await axios.get(`/user/name/of/${friendId}`);
            const balanceResponse = await axios.post("/friend/balance", {
              uid: uid,
              fid: friendId,
            });
            console.log("--------------------");
            console.log("Friend ID:", friendId);
            console.log("Name response:", nameResponse.data);
            console.log("Balance response:", balanceResponse.data);
            return {
              fid: friendId,
              f_name: nameResponse.data.name,
              f_balance: balanceResponse.data.balance,
            };
          } catch (error) {
            console.error("Error fetching friend name:", error);
            return null;
          }
        });

        // Wait for all name fetching promises to resolve
        const friendNameBalance = await Promise.all(friendNameBalancePromises);
        console.log("Friend names:", friendNameBalance);

        // Update state with friend names
        setFriends(friendNameBalance.filter((name) => name !== null)); // Filter out null values

        // Optionally update the local storage
        // TODO: Make a dict to store friend names and IDs
        localStorage.setItem("friends", JSON.stringify(friendNameBalance));
      })
      .catch((error) => {
        console.error("Error fetching friends:", error);
      });
  }, [uid]);

  return (
    <div className="pageContainer">
      <div className="headerBackground">
        <div className="headerText">Friends</div>
        <img
          className="deleteIcon"
          alt=""
          src="/delete.svg"
          onClick={onBackButtonClick}
        />
        <button className="addfriends" onClick={onAddFriendsClick}>
          Add Friends
        </button>
      </div>
      {isAddFriendsOpen && (
        <AddFriends
          isAddFriendsOpen={isAddFriendsOpen}
          setIsAddFriendsOpen={setIsAddFriendsOpen}
        />
      )}
      <div className="friendsList">
        <div className="friendlistHeader">Your friends are:</div>
        {friends.length > 0 ? (
          <>
            {friends.map((friendNameBalance, index) => (
              <div
                key={index}
                className="friendItem"
                onClick={onFriendClick}
                id={friendNameBalance.fid}
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
                <div className="friendText">
                  {/* TODO: Add UNIVERSAL CSS for balance and name */}
                  {friendNameBalance.f_name}
                  <br />
                  {friendNameBalance.f_balance < 0 ? (
                    <span style={{ color: "green" }}>
                      -${Math.abs(friendNameBalance.f_balance).toFixed(2)}
                    </span>
                  ) : (
                    <span style={{ color: "red" }}>
                      ${friendNameBalance.f_balance.toFixed(2)}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </>
        ) : (
          <div className="noFriends">You have no friends</div>
        )}
      </div>
    </div>
  );
};

export default FriendsPage;
