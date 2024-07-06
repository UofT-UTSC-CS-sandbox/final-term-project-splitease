import User from "../models/User.js";
import Group from "../models/Group.js";

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

// Remove a group from a user
export const removeGroup = async (id, groupId) => {
  const user = await User.findById(id);
  if (user) {
    // // Remove group from user (reduntant)
    // user.groups.pull(groupId);
    // await user.save();

    // Remove group from group members
    members = Group.findById(groupId).members;
    for (const memberId of members) {
      const memberUser = await User.findById(memberId);
      if (memberUser) {
        memberUser.groups.pull(groupId);
        await memberUser.save();
      }
    }

    // Remove group
    await Group.deleteOne({ _id: groupId });
    return true;
  }
  return false;
};
