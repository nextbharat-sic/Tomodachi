// Copyright © 2025 Suzuki Motor Corporation All Rights Reserved
import axios from "axios";

export default async function checkOtpCode(otp) {
  const checkOTPURL = import.meta.env.VITE_APP_CHECK_OTP_CODE;
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
