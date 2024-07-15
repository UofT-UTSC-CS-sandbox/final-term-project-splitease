import User from "../models/User.js";
import Group from "../models/Group.js";
import { validateFriend } from "./friend.js";

// Get all groups
export const getAllGroups = async () => {
  return await Group.find();
};

// Get groups by user id
export const getGroups = async (id) => {
  const user = await User.findById(id);
  if (user) {
    return user.groups;
  }
  console.log("the user has prooblem");
  return null;
};

// Check if user is in this group
export const validateGroup = async (uid, groupId, friendId) => {
  const user = await User.findById(uid);
  const group = await Group.findById(groupId);
  const friendUser = await User.findById(friendId);
  if (!user || !group || !friendUser) return false;
  if (!group.members.includes(user._id.toString())) return false;
  if (friendUser.groups.includes(groupId)) return false;
  return true;
};

// Get group name by group id
export const getGroupNameById = async (id) => {
  try {
    const group = await Group.findById(id);
    if (group) {
      return group.name;
    }
    return null;
  } catch (error) {
    console.error(`Error fetching group by ID: ${error}`);
    return null;
  }
};

// Add/Create a group to a user
export const createGroup = async (id, groupName, friends) => {
  // Check if users are friends with the user
  const user = await User.findById(id);
  console.log("The user who is making the group is: ", user);
  if (!user) {
    return false;
  }

  const friend_list = [];
  friend_list.push(id);
  for (const friend of friends) {
    const frinedUser = await User.findOne({ name: friend.name });

    // Check if friend exists
    if (!frinedUser) {
      console.warn(`User ${friend.name} not found, removed from group`);
      continue;
    }

    // Check if friend is a friend of the user
    if (frinedUser && user.friends.includes(frinedUser._id)) {
      friend_list.push(frinedUser._id);
    } else {
      console.warn(
        `User ${friend.name} is not a friend of user ${user.name}, removed from group`
      );
    }
  }

  // Check if user is already in the group
  if (!friend_list.includes(id)) {
    friend_list.push(id); // Add user to group
  }

  // TODO: Check if user is already in a group with the same name

  // Create group
  const group = new Group({
    name: groupName,
    members: friend_list,
    // TODO: Add creation date and last updated date
  });

  let result;
  try {
    result = await group.save();
  } catch (e) {
    console.error(e);
    if (e.code === 11000) {
      console.error("Duplicate group name");
      return 11000;
    } else {
      console.error("Unknown error");
      return false;
    }
  }

  if (!result) {
    return false;
  }

  // Add group to all members
  for (const friendId of friend_list) {
    const memberUser = await User.findById(friendId);
    if (memberUser) {
      memberUser.groups.push(result._id);
      await memberUser.save();
    }
  }

  return result._id;
};

// Check group relationship
export const checkGroupRelationship = async (id, groupId) => {
  if (!id || !groupId)
    return { result: false, error: "Invalid user id or group id" };
  const user = await User.findById(id);
  const group = await Group.findById(groupId);
  if (!user) return { result: false, error: "User not found" };
  if (!group) return { result: false, error: "Group not found" };
  if (!user.groups.includes(groupId) || !group.members.includes(id))
    return { result: false, error: "User is not a member of the group" };
  return { result: true, error: null };
};

// Remove a group from a user
export const deleteGroup = async (id, groupId) => {
  const { result, error } = await checkGroupRelationship(id, groupId);
  if (!result) return { result: false, error };

  // Remove group from group members
  const members = group.members;
  for (const memberId of members) {
    const memberUser = await User.findById(memberId);
    if (memberUser) {
      memberUser.groups.pull(groupId);
      await memberUser.save();
    }
  }

  // Remove group
  await Group.deleteOne({ _id: groupId });
  return { result: true, error: null };
};

// Quit a group
export const quitGroup = async (id, groupId) => {
  const { result, error } = await checkGroupRelationship(id, groupId);
  if (!result) return { result: false, error };

  // Remove group from user
  const user = await User.findById(id);
  user.groups.pull(groupId);
  await user.save();

  // Remove user from group
  const group = await Group.findById(groupId);
  group.members.pull(id);
  await group.save();

  return { result: true, error: null };
};

// Invite a friend to a group
export const inviteFriend = async (id, groupId, friendId) => {
  if (!(await validateGroup(id, groupId, friendId))) return false;

  const user = await User.findById(id);
  const group = await Group.findById(groupId);
  if (!user || !group) return false;

  const { isValid, _, friendUser } = await validateFriend(id, friendId);
  if (!isValid) return false;

  // Check if friend is already in the group
  if (group.members.includes(friendUser._id)) return false;

  // Add friend to group
  group.members.push(friendUser._id);
  await group.save();

  // Add group to friend
  friendUser.groups.push(groupId);
  await friendUser.save();

  return true;
};
