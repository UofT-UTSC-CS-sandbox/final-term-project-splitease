import { useCallback, useEffect, useState } from "react";
import "./FriendsPage.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AddFriends from "../components/AddFriends";

const FriendsPage = () => {
  const navigate = useNavigate();
  const [isAddFriendsOpen, setIsAddFriendsOpen] = useState(false);
  const uid = localStorage.getItem("uid");
  console.log("My UID is:", uid);

  const [friends, setFriends] = useState([]);

  const onAddFriendsClick = useCallback(() => {
    // navigate("/addfriends");
    setIsAddFriendsOpen(true);
  }, [navigate]);

  const onDeleteIconClick = useCallback(() => {
    navigate("/friendsgroupspage");
  }, [navigate]);

  useEffect(() => {
    if (uid) {
      axios
        .get(`/friend/of/${uid}`)
        .then(async (response) => {
          console.log("Friends data:", response.data);
          // Map over friend IDs to fetch names
          const friendIds = response.data.friends;
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
        {isAddFriendsOpen && (
          <AddFriends onClose={() => setIsAddFriendsOpen(false)} />
        )}
      </div>
      <div className="friendsList">
        <div className="friendlistHeader">Your friends are:</div>
        {friends.length > 0 ? (
          <>
            {friends.map((friendName, index) => (
              <div key={index} className="friendItem">
                {friendName}
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
