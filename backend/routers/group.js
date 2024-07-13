import express from "express";
import {
  createGroup,
  getGroups,
  getGroupNameById,
  getAllGroups,
  inviteFriend,
} from "../modules/group.js";
import { validateFriend } from "../modules/friend.js";
import Group from "../models/Group.js";
import { getTransactionByGroup } from "../modules/transaction.js";

export const groupRouter = express.Router();

// Get all groups
groupRouter.get("/", async function (req, res, next) {
  console.info("You've reached the group router!");

  // Get all groups
  const groups = await getAllGroups();
  res.status(200).json(groups);
});

// Get group by user id
groupRouter.get("/:id", async function (req, res) {
  const { id } = req.params;

  // Validate id
  if (!id) {
    res.status(401).json({ error: "Invalid user id" });
  }

  // Get groups list
  else {
    try {
      const groups = await getGroups(id);
      if (groups) {
        console.info("groups", groups);
        res.status(200).json(groups);
      } else {
        res.status(401).json({ error: "Invalid user" });
      }
    } catch (e) {
      console.error("e", e);
      res.status(500).json({ error: `Unknown server error: ${e}` });
    }
  }
});

groupRouter.get("/name/of/:id", async function (req, res) {
  const { id } = req.params;

  // Validate id
  if (!id) {
    res.status(401).json({ error: "Invalid group id" });
    return;
  }

  // Get group name by id
  try {
    const groupName = await getGroupNameById(id);
    if (groupName) {
      console.info("group name", groupName);
      res.status(200).json({ group_name: groupName });
    } else {
      res.status(401).json({ error: "Group not found" });
    }
  } catch (e) {
    console.error("e", e);
    res.status(500).json({ error: `Unknown server error: ${e}` });
  }
});

// Create a new group
groupRouter.post("/add/:id", async function (req, res) {
  const { id, groupName, friends } = req.body;

  // Validate uid, groupName, and friends
  if (!id || !groupName || !friends) {
    res.status(401).json({ error: "Invalid user id, group name, or friends" });
  }

  // Create group
  else {
    try {
      const groupId = await createGroup(id, groupName, friends);
      if (groupId && groupId !== 11000) {
        console.info("group Id", groupId);
        res.status(200).json(groupId);
      } else if (groupId == 11000) {
        res.status(400).json({ error: "Group name already exists" });
      } else {
        res.status(401).json({ error: "Invalid group" });
      }
    } catch (e) {
      console.error("e", e);
      res.status(500).json({ error: `Unknown server error: ${e}` });
    }
  }
});

// Invite a friend to a group
groupRouter.post("/invite", async function (req, res) {
  const { id, groupId, friendId } = req.body;

  // Validate uid, groupId, and friendId
  if (!id || !groupId || !friendId) {
    res.status(401).json({ error: "Invalid user id, group id, or friend id" });
    return;
  }

  // Invite friend to group
  const { isValid, user, friendUser } = await validateFriend(id, friendId);
  const group = await Group.findById(groupId);
  if (!isValid) {
    res.status(401).json({ error: "Friendship validation failed" });
    return;
  }
  if (!group) {
    res.status(401).json({ error: "Group not found" });
    return;
  }

  // Add friend to group
  try {
    const result = await inviteFriend(id, groupId, friendId);
    if (result) {
      console.info("Successfully invited friend to group");
      console.info(id, groupId, friendId);
      res.status(200).json(result);
    } else {
      console.error("Failed to invite friend to group");
      let error_str = "faulty user, group, or friend";
      if (!user || !group || !friendUser)
        error_str = "Invalid user, group, or friend";
      if (!group.members.includes(user._id.toString()))
        error_str = "User is not a member of the group";
      if (friendUser.groups.includes(groupId))
        error_str = "Friend is already a member of the group";
      res.status(401).json({ error: error_str });
      return;
    }
  } catch (e) {
    console.error("e", e);
    res.status(500).json({ error: `Unknown server error: ${e}` });
  }
});

// Get group details (name, members, recent transactions)
groupRouter.get("/details/:id", async function (req, res) {
  const { id } = req.params;

  // Validate id
  if (!id) {
    res.status(401).json({ error: "Invalid group id" });
    return;
  }

  // Get group details
  try {
    const group = await Group.findById(id);
    // Get recent transactions
    const transactions = await getTransactionByGroup(id);
    if (group) {
      console.info("group", group);
      group.transactions = transactions;
      res.status(200).json(group);
    } else {
      res.status(401).json({ error: "Group not found" });
    }
  } catch (e) {
    console.error("e", e);
    res.status(500).json({ error: `Unknown server error: ${e}` });
  }
});
