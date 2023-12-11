import axios from "axios";

export default async function checkLogInInformation(logInInformation) {
  const CheckLogInURL = import.meta.env.VITE_APP_CHECK_LOG_IN;
  const header = { "Content-Type": "application/json" };
  try {
    const response = await axios.post(CheckLogInURL, logInInformation, {
      headers: header,
    });
    return response.data;
  } catch (error) {
    return error;
  }
}
