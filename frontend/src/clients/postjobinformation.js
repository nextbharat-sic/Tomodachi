import axios from "axios";

export default async function postJobInformation(jobInformation) {
  const postJobInfoURL = import.meta.env.VITE_APP_POST_JOB_INFO;
  const header = { "Content-Type": "application/json" };
  try {
    const response = await axios.post(postJobInfoURL, jobInformation, {
      headers: header,
    });
    return response.data;
  } catch (error) {
    return error;
  }
}
