import axios from "axios";

export default async function postUserInformation(userInformation) {
  const postUserInfoURL = import.meta.env.VITE_APP_POST_USER_INFO;
  const header = { "Content-Type": "application/json" };
  try {
    const response = await axios.post(postUserInfoURL, userInformation, {
      headers: header,
    });
    return response.data;
  } catch (error) {
    return error;
  }
}
