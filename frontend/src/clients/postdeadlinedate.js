import axios from "axios";

export default async function postdeadlinedate(deadlineInfo) {
  const postInfoURL = "";
  const header = { "Content-Type": "application/json" };
  try {
    const response = await axios.post(postInfoURL, deadlineInfo, {
      headers: header,
    });
    return response.data;
  } catch (error) {
    return error;
  }
}
