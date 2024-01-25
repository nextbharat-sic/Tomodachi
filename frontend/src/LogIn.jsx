import { useState } from "react";
import { useDispatch } from "react-redux";
import Link from "@mui/material/Link";
import generateLogInOtpCode from "./clients/generateloginotpcode.js";
import Box from "@mui/material/Grid";
import { useTranslation } from "react-i18next";

const LogIn = () => {
  const { t } = useTranslation();
  const [accountName, setAccountName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const dispatch = useDispatch();

  const handleInputChange = (event) => {
    setAccountName(event.target.value);
    if (event.target.value.includes(" ")) {
      setIsButtonDisabled(true);
    } else {
      setIsButtonDisabled(false);
    }
  };

  const logInStatus = (userID) => {
    const storePage = { type: "CHANGE_PAGE_STATE", payload: "CheckOtpPage" };
    const storeUserID = { type: "SET_USER_ID", payload: userID };
    const storeAccountName = { type: "SET_ACCOUNT_NAME", payload: accountName };
    const storePhoneNumber = { type: "SET_PHONE_NUMBER", payload: phoneNumber };

    dispatch(storePage);
    dispatch(storeUserID);
    dispatch(storeAccountName);
    dispatch(storePhoneNumber);
  };

  const moveSignUpScreen = () => {
    const storePage = { type: "CHANGE_PAGE_STATE", payload: "SignUpPage" };
    dispatch(storePage);
  };

  const checkLogin = async () => {
    setIsLoading(true);
    const logInInformation = {
      accountName: accountName,
      phoneNumber: phoneNumber,
    };

    const storeClientPage = { type: "SET_CLIENT_PAGE", payload: "logIn" };
    dispatch(storeClientPage);

    const result = await generateLogInOtpCode(logInInformation);
    if (result.status == "Match") {
      setIsLoading(false);
      logInStatus(result.userID);
    } else if (result.status == "Unmatch") {
      setIsLoading(false);
      alert(t("accountNameOrPhNoIsIncorrect"));
    } else {
      setIsLoading(false);
      alert(t("tryAgain"));
    }
  };

  return (
    <>
      <div>
        <h2 style={{ textAlign: "center" }}>{t("logIn")}</h2>
        <div style={{ textAlign: "left", paddingLeft: "3vw" }}>
          <label>{t("accountName")}</label>
        </div>
        <Box display="flex" justifyContent="center" alignItems="center">
          <div>
            <input
              type="text"
              value={accountName}
              className="input"
              onChange={handleInputChange}
              style={{
                width: "86vw",
                margin: "10px",
                height: "5vh",
                borderRadius: "10px",
                borderWidth: "1px",
              }}
            ></input>
          </div>
        </Box>
        {isButtonDisabled ? (
          <Box>
            <div
              style={{
                fontSize: "0.5em",
                color: "red",
                paddingLeft: "5vw",
                marginBottom: "1vh",
              }}
            >
              {t("includeSpaces")}
            </div>
          </Box>
        ) : (
          <Box></Box>
        )}
        <div style={{ textAlign: "left", paddingLeft: "3vw" }}>
          <label>{t("phoneNumber")}</label>
        </div>
        <Box display="flex" justifyContent="center" alignItems="center">
          <div>
            <input
              type="text"
              value={phoneNumber}
              className="input"
              onChange={(event) => setPhoneNumber(event.target.value)}
              style={{
                width: "86vw",
                margin: "10px",
                height: "5vh",
                borderRadius: "10px",
                borderWidth: "1px",
              }}
            ></input>
          </div>
        </Box>
        <Box display="flex" justifyContent="center" alignItems="center">
          {isButtonDisabled ? (
            <button
              style={{
                margin: "10px",
                backgroundColor: "#b3b3b3b3",
                color: "black",
              }}
            >
              {t("logIn")}
            </button>
          ) : (
            <button
              onClick={checkLogin}
              disabled={isLoading}
              style={{
                margin: "10px",
                backgroundColor: "#2F69F6",
                color: "#e0f2f1",
              }}
            >
              {isLoading ? t("loginNow") : t("logIn")}
            </button>
          )}
        </Box>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <label style={{ marginRight: "5px" }}>{t("dontHaveAnAccount")}</label>
          <Link underline="none" onClick={moveSignUpScreen}>
            {t("signUp")}
          </Link>
        </div>
      </div>
    </>
  );
};

export default LogIn;
