import axios from "axios";

export default async function checkSignUpOtpCode(otp) {
  const checkOTPURL = import.meta.env.VITE_APP_CHECK_OTP_CODE;
  const header = { "Content-Type": "application/json" };
  try {
    const response = await axios.post(checkOTPURL, otp, {
      headers: header,
    });
    // return response.data;

    // Just testing. After creating check_OTP lambda, delete below line
    console.log(response.data);
    return { status: "Success" };
  } catch (error) {
    return error;
  }
}
