import React, { useState } from "react";
import { MuiOtpInput } from "mui-one-time-password-input";
import { useSelector } from "react-redux";
import Box from "@mui/material/Grid";
import checkOtpCode from "./clients/checkotpcode.js";
import { useTranslation } from "react-i18next";

const CheckOtp = () => {
  const { t } = useTranslation();
  const [userName, setUserName] = useState("tentative");
  const [isLoading, setIsLoading] = useState(false);
  const [otp, setOtp] = React.useState("");

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

  const otpChecking = async () => {
    if (otp == "") {
      alert(t("inputOtpCode"));
      return false;
    }
    setIsLoading(true);
    const result = await checkOtpCode(otpInformation);
    if (result.status == "Success") {
      alert(t("signUpCompleted"));
    } else {
      alert(t("otpIsIncorrect"));
      setIsLoading(false);
    }
  };

  return (
    <>
      <h2 style={{ textAlign: "center" }}>{t("verification")}</h2>
      <div style={{ textAlign: "center" }}>
        {t("enterVerificationCode")} <br /> {t("toPhoneNumber")}
        {phoneNumber}
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
        {t("dontReceiveOtp")}
        <a>
          <u>{t("resendOtp")}</u>
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
          {isLoading ? t("verifying") : t("verify")}
        </button>
      </Box>
    </>
  );
};

export default CheckOtp;
