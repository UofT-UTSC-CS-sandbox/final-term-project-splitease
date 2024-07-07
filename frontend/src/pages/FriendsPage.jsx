import { useCallback, useEffect, useState } from "react";
import "./FriendsPage.css";
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

  const onDeleteIconClick = useCallback(() => {
    navigate("/friendsgroupspage");
  }, [navigate]);

  const onFriendClick = useCallback(() => {
    // TODO: Display group details
  }, [navigate]);

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
          method: 'delete',
          url: '/friend/delete',
          data: { uid, fid: friendToDelete }
        })
        .then((res) => {
          const updatedFriends = friends.filter((_, i) => i !== index);
          setFriends(updatedFriends);
          navigate(0, { replace: true });
        })
        .catch((error) => {
          console.error("Error deleting friend:", error);
          Swal.fire("Error", "Failed to delete friend. Please try again.", "error");
        });
      }
    });
  };
  

  useEffect(() => {
    if (uid) {
      axios
        .get(`/friend/of/${uid}`)
        .then(async (response) => {
          console.log("Friends data:", response.data);
          // Map over friend IDs to fetch names
          const friendIds = response.data.friends;
          setFriendIDs(friendIds);
          console.log("Friends ids:", friendIds);
          const friendNamesPromises = friendIds.map(async (friendId) => {
            try {
              const nameResponse = await axios.get(`/user/name/of/${friendId}`);
              console.log("Each name is:", nameResponse);
              return nameResponse.data.user_name;
            } catch (error) {
              console.error("Error fetching friend name:", error);
              return null; // Handle error case
            }
          });
          // Wait for all name fetching promises to resolve
          const friendNames = await Promise.all(friendNamesPromises);
          console.log("Friend names:", friendNames);
          // Update state with friend names
          setFriends(friendNames.filter((name) => name !== null)); // Filter out null values
          // Optionally update the local storage
          localStorage.setItem("friends", JSON.stringify(friendNames));
        })
        .catch((error) => {
          console.error("Error fetching friends:", error);
        });
    }
  }, [uid]);

  return (
    <div className="friendspage">
      <div className="friendspageChild">
        <div className="friendsHeader">Friends</div>
        <img
          className="deleteIcon"
          alt=""
          src="/delete.svg"
          onClick={onDeleteIconClick}
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
            {friends.map((friendName, index) => (
              <div key={index} className="friendItem">
                <div
                  className="closeButton"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent triggering the onGroupClick event
                    onCloseButton(index);
                  }}
                >
                  x
                </div>
                <div className="friendText" onClick={onFriendClick}>
                  {friendName}
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
