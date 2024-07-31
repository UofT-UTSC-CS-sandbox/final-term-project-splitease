import express from "express";
import Group from "../models/Group.js";
import { validateFriend } from "../modules/friend.js";
import {
  createGroup,
  deleteGroup,
  getAllGroups,
  getGroupNameById,
  getGroups,
  getGroupsByName,
  inviteFriend,
  quitGroup,
} from "../modules/group.js";
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

// Get group name by id
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

// Get group names by partial name
groupRouter.get("/partial/:name", async function (req, res) {
  const { name } = req.params;

  // Validate name
  if (!name) {
    res.status(401).json({ error: "Invalid group name" });
    return;
  }

  // Get group names by partial name
  try {
    const groups = await getGroupsByName(name);
    if (groups) {
      console.info("groups", groups);
      res.status(200).json(groups);
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

// Delete a group
groupRouter.delete("/delete", async function (req, res) {
  const { uid, groupId } = req.body;

  // Validate id and groupId
  if (!uid || !groupId) {
    res.status(401).json({ error: "Invalid user id or group id" });
    return;
  }

  // Delete group
  try {
    const { result, error } = await deleteGroup(uid, groupId);
    if (result) {
      console.info("Successfully deleted group");
      res.status(200).json(result);
    } else {
      console.error("Failed to deleted group");
      console.error("error", error);
      res.status(401).json({ error: error });
    }
  } catch (e) {
    console.error("e", e);
    res.status(500).json({ error: `Unknown server error: ${e}` });
  }
});

// Quit a group
groupRouter.delete("/quit", async function (req, res) {
  const { uid, groupId } = req.body;

  // Validate id and groupId
  if (!uid || !groupId) {
    res.status(401).json({ error: "Invalid user id or group id" });
    return;
  }

  // Quit group
  try {
    const { result, error } = await quitGroup(uid, groupId);
    if (result) {
      console.info("Successfully quit group");
      res.status(200).json(result);
    } else {
      console.error("Failed to quit group");
      console.error("error", error);
      res.status(401).json({ error: error });
    }
  } catch (e) {
    console.error("e", e);
    res.status(500).json({ error: `Unknown server error: ${e}` });
  }
});
