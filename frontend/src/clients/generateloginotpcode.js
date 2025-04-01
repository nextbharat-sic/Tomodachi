// Copyright © 2025 Suzuki Motor Corporation All Rights Reserved
import axios from "axios";

export default async function generateLogInOtpCode(userInformation) {
  const postGenerateLogInOTPURL = import.meta.env
    .VITE_APP_GENERATE_LOG_IN_OTP_CODE;
  const header = { "Content-Type": "application/json" };
  try {
    const response = await axios.post(
      postGenerateLogInOTPURL,
      userInformation,
      {
        headers: header,
      },
    );
    return response.data;
  } catch (error) {
    return error;
  }
}
