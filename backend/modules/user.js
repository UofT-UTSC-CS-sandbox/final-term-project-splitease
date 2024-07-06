import bcrypt from "bcrypt";
import User from "../models/User.js";
import Group from "../models/Group.js";
import ObjectId from "../models/ObjectId.js";

// Get all users
export const getAllUsers = async () => {
  return await User.find();
};

// Verify that a user exists
export const verifyUserById = async (id) => {
  const user = await User.findById(id);
  if (user) {
    return true;
  }
  return false;
};

// Check if a user exists by name
export const getUserIdByName = async (name) => {
  const user = await User.findOne({ name });
  if (user) {
    return user._id;
  }
  return null;
};

// Get user name by id
export const getUserNameById = async (id) => {
  const user = await User.findById(id);
  if (user) {
    return user.name;
  }
  return null;
};

// Login a user
export const checkUserPassword = async (name, password) => {
  const user = await User.findOne({ name });
  if (user) {
    const match = await bcrypt.compare(password, user.password);
    if (match) {
      return user._id;
    }
    return -1; // Invalid password
  }
  return 0; // User not found
};

// Register a new user
export const registerUser = async (name, password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({
    name,
    password: hashedPassword,
  });
  console.log(password, hashedPassword);
  const result = await user.save(); // returns the user object
  return result._id;
};
