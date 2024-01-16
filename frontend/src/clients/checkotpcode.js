import axios from "axios";

export default async function postOtpCode(otp) {
  const checkOTPURL = import.meta.env.VITE_APP_GENERATE_OTP_CODE;
  const header = { "Content-Type": "application/json" };
  try {
    const response = await axios.post(checkOTPURL, otp, {
      headers: header,
    });
    return response.data;
  } catch (error) {
    return error;
  }
}
