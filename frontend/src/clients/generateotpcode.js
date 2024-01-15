import axios from "axios";

export default async function postUserInformation(userInformation) {
  const postGenerateOTPURL = import.meta.env.VITE_APP_GENERATE_OTP_CODE;
  const header = { "Content-Type": "application/json" };
  try {
    const response = await axios.post(postGenerateOTPURL, userInformation, {
      headers: header,
    });
    return response.data;
  } catch (error) {
    return error;
  }
}
