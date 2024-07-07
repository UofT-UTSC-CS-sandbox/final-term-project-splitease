import axios from "axios";

export const getUserNameById = async (id) => {
  if (!id) {
    console.error("Invalid user id");
    return null;
  }
  try {
    const response = await axios.get(`/user/name/of/${id}`);
    return response.data.name;
  } catch (e) {
    console.error("Error getting user name by id:", e);
    return null;
  }
};
