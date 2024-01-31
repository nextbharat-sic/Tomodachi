import axios from "axios";

export default async function postCallInformation(callInformation) {
  const postInfoURL = import.meta.env.VITE_APP_POST_CALL;
  const header = { "Content-Type": "application/json" };
  try {
    const response = await axios.post(postInfoURL, callInformation, {
      headers: header,
    });
    return response.data;
  } catch (error) {
    return error;
  }
}
