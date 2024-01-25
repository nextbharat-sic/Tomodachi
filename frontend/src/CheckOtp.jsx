import React, { useState, useEffect } from "react";
import { MuiOtpInput } from "mui-one-time-password-input";
import { useSelector, useDispatch } from "react-redux";
import Box from "@mui/material/Grid";
import checkOtpCode from "./clients/checkotpcode.js";
import { useTranslation } from "react-i18next";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const CheckOtp = () => {
  const { t } = useTranslation();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [userName, setUserName] = useState("tentative");
  const [isLoading, setIsLoading] = useState(false);
  const [otp, setOtp] = React.useState("");
  const dispatch = useDispatch();
  const handleChange = (newValue) => {
    setOtp(newValue);
  };

  const phoneNumber = useSelector((state) => state.phoneNumber);
  const accountName = useSelector((state) => state.accountName);
  const privacyPolicyCheck = useSelector((state) => state.privacyPolicyCheck);
  const clientPage = useSelector((state) => state.clientPage);
  const otpInformation = {
    userName: userName,
    phoneNumber: phoneNumber,
    otp: otp,
    accountName: accountName,
    privacyPolicyCheck: privacyPolicyCheck,
    clientPage: clientPage,
  };

  useEffect(() => {
    const darkModeMediaQuery = window.matchMedia(
      "(prefers-color-scheme: dark)",
    );
    setIsDarkMode(darkModeMediaQuery.matches);

    // Event listener for changes in dark mode preference
    const handleDarkModeChange = (event) => {
      setIsDarkMode(event.matches);
    };

    // Attach the event listener
    darkModeMediaQuery.addEventListener("change", handleDarkModeChange);

    // Clean up the event listener when the component unmounts
    return () => {
      darkModeMediaQuery.removeEventListener("change", handleDarkModeChange);
    };
  }, []);

  const otpVerifiedStatus = () => {
    const storePage = { type: "CHANGE_PAGE_STATE", payload: "OtpVerifiedPage" };
    const storeIsSignIn = { type: "SIGNIN_STATE", payload: true };
    dispatch(storePage);
    dispatch(storeIsSignIn);
  };

  const otpChecking = async () => {
    if (otp == "") {
      alert(t("inputOtpCode"));
      return false;
    }
    setIsLoading(true);
    const result = await checkOtpCode(otpInformation);
    if (result.status == "Success") {
      otpVerifiedStatus();
    } else {
      alert(t("otpIsIncorrect"));
      setIsLoading(false);
    }
  };

  const backPage = () => {
    if (clientPage === "signUp") {
      const storePage = { type: "CHANGE_PAGE_STATE", payload: "SignUpPage" };
      dispatch(storePage);
    }
    if (clientPage === "logIn") {
      const storePage = { type: "CHANGE_PAGE_STATE", payload: "LogIn" };
      dispatch(storePage);
    }
  };

  return (
    <>
      <div
        style={{
          display: "flex",
        }}
      >
        <ArrowBackIcon
          onClick={backPage}
          style={{
            marginTop: "auto",
            marginBottom: "auto",
            marginLeft: "2vw",
            width: "10vw",
          }}
        />
        <h2 style={{ marginLeft: "auto", marginRight: "auto" }}>
          {t("verification")}
        </h2>
        <div
          style={{
            marginRight: "2vw",
            width: "10vw",
          }}
        />
      </div>
      <div style={{ textAlign: "center" }}>
        {t("enterVerificationCode")} <br /> {t("toPhoneNumber")}
        {phoneNumber}
      </div>
      <MuiOtpInput
        style={{
          marginTop: "5vh",
          width: "76vw",
          marginLeft: "12vw",
          backgroundColor: isDarkMode ? "#333" : "white",
        }}
        TextFieldsProps={{
          inputProps: {
            style: {
              color: isDarkMode ? "white" : "black",
              padding: "1vh 0",
              border: "solid 0.5px",
              borderRadius: "5px",
              borderColor: isDarkMode ? "white" : "black",
            },
          },
        }}
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
          {isLoading ? t("verifying") : t("verify")}
        </button>
      </Box>
    </>
  );
};

export default CheckOtp;
