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

// Get friends by partial name
export const getFriendsByPartialName = async (uid, name) => {
  const user = await User.findById(uid);
  if (!user) return null;

  const regex = new RegExp(name.split("").join(".*"), "i");
  const friends = await User.find({
    name: regex,
    _id: { $in: user.friends },
  });

  for (const friend of friends) {
    friend.password = undefined;
    friend.friends = undefined;
    friend.groups = undefined;
  }

  return friends;
};

// Check if a user is friends with another user
export const isFriend = async (uid, fid) => {
  const user = await User.findById(uid);
  if (user) {
    return user.friends.includes(fid);
  }
  return false;
};

// Validate friend relationship
export const validateFriend = async (uid, fid) => {
  const user = await User.findById(uid);
  const friendUser = await User.findById(fid);

  // Validate id and friendId
  if (!user || !friendUser) {
    return { isValid: false, user: null, friendUser: null };
  }

  // Check relationship
  if (!(await isFriend(uid, fid))) {
    return { isValid: false, user, friendUser };
  }

  return { isValid: true, user, friendUser };
};

// Add a friend to a user
export const addFriend = async (uid, fid) => {
  const user = await User.findById(uid);
  const friendUser = await User.findById(fid);

  // Validate id and friendId
  if (!user || !friendUser)
    return { isValid: false, user: null, friendUser: null };

  // Check relationship
  if (await isFriend(uid, fid)) return false;

  // Add friend to user's friends list
  user.friends.push(fid);
  await user.save();

  // Add user to friend's friends list
  friendUser.friends.push(uid);
  await friendUser.save();

  return true;
};

// Get friend details (name, info, balance, recent transactions)
export const getFriendDetails = async (uid, fid) => {
  // Validate id and friendId
  const result = await validateFriend(uid, fid);
  if (!result.isValid) return null;
  const { friendUser: friend } = result;

  // Get balance
  const balance = await getUserAndFriendBalance(uid, fid);

  // Get recent transactions
  const transactions = await getTransactionByUserAndFriend(uid, fid);

  return {
    name: friend.name,
    balance: balance,
    transactions: transactions,
  };
};

// Delete a friend from a user
export const deleteFriend = async (uid, fid) => {
  // Validate id and friendId
  const result = await validateFriend(uid, fid);
  if (!result.isValid) return false;
  const { user, friendUser } = result;

  // Remove friend from user's friends list
  user.friends = user.friends.filter((f) => f.toString() !== fid);
  await user.save();

  // Remove user from friend's friends list
  friendUser.friends = friendUser.friends.filter((f) => f.toString() !== uid);
  await friendUser.save();

  return true;
};
