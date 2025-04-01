// Copyright © 2025 Suzuki Motor Corporation All Rights Reserved
import axios from "axios";

export default async function generateSignUpOtpCode(userInformation) {
  const postGenerateSignUpOTPURL = import.meta.env
    .VITE_APP_GENERATE_SIGN_UP_OTP_CODE;
  const header = { "Content-Type": "application/json" };
  try {
    const response = await axios.post(
      postGenerateSignUpOTPURL,
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
