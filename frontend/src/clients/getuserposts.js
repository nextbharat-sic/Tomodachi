// Copyright © 2025 Suzuki Motor Corporation All Rights Reserved
import axios from "axios";

export default async function getUserPosts(userID) {
  const getUserPostsURL = import.meta.env.VITE_APP_GET_USER_POSTS;
  const header = { "Content-Type": "application/json" };
  try {
    const response = await axios.post(getUserPostsURL, userID, {
      headers: header,
    });
    return response.data;
  } catch (error) {
    return error;
  }
}
