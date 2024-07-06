import User from "../models/User.js";
import {
  getUserAndFriendBalance,
  getTransactionByUserAndFriend,
} from "./transaction.js";

// Get friends by user id
export const getFriends = async (id) => {
  const user = await User.findById(id);
  if (user) {
    return user.friends;
  }
  return null;
};

// Add a friend to a user
export const addFriend = async (uid, fid) => {
  const user = await User.findById(uid);
  const friendUser = await User.findById(fid);

  // Validate id and friendId
  if (!user || !friendUser) {
    return false; // User not found
  }

  // Check if friend already exists
  if (user.friends.includes(fid)) {
    return -1; // Friend already exists
  }

  // Add friend to user's friends list
  user.friends.push(fid);
  await user.save();

  // Add user to friend's friends list
  friendUser.friends.push(uid);
  await friendUser.save();

  return true;
};

// Check if a user is friends with another user
export const isFriend = async (uid, fid) => {
  const user = await User.findById(uid);
  if (user) {
    console.log("user.friends", user.friends);
    return user.friends.includes(fid);
  }
  return false;
};

// Get friend details (name, info, balance, recent transactions)
export const getFriendDetails = async (uid, fid) => {
  const user = await User.findById(uid);
  const friend = await User.findById(fid);

  // Validate id and friendId
  if (!user || !friend) {
    return null;
  }

  // Check if user is friends with friend
  if (!isFriend(uid, fid)) {
    return null;
  }

  // Get balance
  const balance = getUserAndFriendBalance(uid, fid);

  // Get recent transactions
  const transactions = getTransactionByUserAndFriend(uid, fid);

  return {
    name: friend.name,
    balance: balance,
    transactions: transactions,
  };
};
