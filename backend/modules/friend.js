import User from "../models/User.js";

// Get friends by user id
export const getFriends = async (id) => {
  const user = await User.findById(id);
  if (user) {
    return user.friends;
  }
  return null;
};

// Add a friend to a user
export const addFriend = async (id, friendId) => {
  const user = await User.findById(id);
  const friendUser = await User.findById(friendId);
  if (user && friendUser) {
    if (user.friends.includes(friendId)) {
      return -1; // Friend already exists
    }

    // Add friend to user's friends list
    user.friends.push(friendId);
    await user.save();

    // Add user to friend's friends list
    friendUser.friends.push(id);
    await friendUser.save();

    return true;
  }
  return 0; // User not found
};
