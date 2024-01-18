import React, { useState } from "react";
import { MuiOtpInput } from "mui-one-time-password-input";
import { useSelector, useDispatch } from "react-redux";
import Box from "@mui/material/Grid";
import checkOtpCode from "./clients/checkotpcode.js";

const CheckOtp = () => {
  const [userName, setUserName] = useState("tentative");
  const [isLoading, setIsLoading] = useState(false);
  const [otp, setOtp] = React.useState("");
  const dispatch = useDispatch();
  const handleChange = (newValue) => {
    setOtp(newValue);
  };

  const phoneNumber = useSelector((state) => state.phoneNumber);
  const accountName = useSelector((state) => state.accountName);
  const otpInformation = {
    userName: userName,
    phoneNumber: phoneNumber,
    otp: otp,
    accountName: accountName,
  };

  const otpVerifiedStatus = () => {
    const storePage = { type: "CHANGE_PAGE_STATE", payload: "OtpVerifiedPage" };
    dispatch(storePage);
  };

  const otpChecking = async () => {
    if (otp == "") {
      alert("Input OTP Code!");
      return false;
    }
    setIsLoading(true);
    const result = await checkOtpCode(otpInformation);
    if (result.status == "Success") {
      otpVerifiedStatus();
    } else {
      alert("OTP entered is incorrect");
      setIsLoading(false);
    }
  };

  return (
    <>
      <h2 style={{ textAlign: "center" }}>Verification</h2>
      <div style={{ textAlign: "center" }}>
        Please enter the verification code send <br /> to +91{phoneNumber}
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
