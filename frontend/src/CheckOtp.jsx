import React, { useState } from "react";
import { MuiOtpInput } from "mui-one-time-password-input";
import { useSelector } from "react-redux";
import Box from "@mui/material/Grid";
import checkOtpCode from "./clients/checkotpcode.js";

const CheckOtp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [otp, setOtp] = React.useState("");

  const handleChange = (newValue) => {
    setOtp(newValue);
  };

  const phoneNumber = useSelector((state) => state.phoneNumber);
  console.log(phoneNumber);

  const otpChecking = async () => {
    setIsLoading(true);
    console.log(otp);
    const result = await checkOtpCode(otp);
    console.log(result.status);
    if (result.status == "Success") {
      alert("User Registration is completed!");
    } else {
      alert("OTP entered is incorrect");
      setIsLoading(false);
    }
  };

  return (
    <>
      <h2 style={{ textAlign: "center" }}>Verification</h2>
      <div style={{ textAlign: "center" }}>
        Please enter the verification code send to +91{phoneNumber}
      </div>
      <MuiOtpInput
        style={{
          marginTop: "5vh",
          width: "76vw",
          marginLeft: "12vw",
        }}
        TextFieldsProps={{ size: "small" }}
        length={6}
        value={otp}
        onChange={handleChange}
        gap="5px"
      />
      <div style={{ marginLeft: "12vw", marginTop: "3vh" }}>
        Don't receive OTP?{" "}
        <a>
          <u>Resend OTP</u>
        </a>
      </div>
      <Box display="flex" justifyContent="center" alignItems="center">
        <button
          onClick={otpChecking}
          disabled={isLoading}
          style={{
            margin: "10px",
            backgroundColor: "#2F69F6",
            color: "#e0f2f1",
            marginTop: "15vh",
          }}
        >
          {isLoading ? "Verifying..." : "Verify"}
        </button>
      </Box>
    </>
  );
};

export default CheckOtp;
