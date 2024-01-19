import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "@mui/material/Link";
import checkLoginInformation from "./clients/checklogininformation.js";
import Box from "@mui/material/Grid";
import { useTranslation } from "react-i18next";

const LogIn = () => {
  const { t } = useTranslation();
  const [accountName, setAccountName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const nextAction = useSelector((state) => state.nextAction);
  const dispatch = useDispatch();

  const logInStatus = (userID) => {
    let storePage = "";
    if (nextAction == "PostInformation") {
      storePage = { type: "CHANGE_PAGE_STATE", payload: "PostPage" };
    } else {
      storePage = { type: "CHANGE_PAGE_STATE", payload: "HomePage" };
    }

    const storeIsSignIn = { type: "SIGNIN_STATE", payload: true };
    const storeUserID = { type: "SET_USER_ID", payload: userID };
    const storeAccountName = { type: "SET_ACCOUNT_NAME", payload: accountName };
    const storePhoneNumber = { type: "SET_PHONE_NUMBER", payload: phoneNumber };

    dispatch(storePage);
    dispatch(storeIsSignIn);
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

    const result = await checkLoginInformation(logInInformation);
    if (result.status == "Match") {
      setIsLoading(false);
      logInStatus(result.userID);
    } else if (result.status == "Unmatch") {
      setIsLoading(false);
      alert(t("accountnameorphnoisincorrect"));
    } else {
      setIsLoading(false);
      alert(t("tryagain"));
    }
  };

  return (
    <>
      <div>
        <h2 style={{ textAlign: "center" }}>{t("login")}</h2>
        <div style={{ textAlign: "left", paddingLeft: "3vw" }}>
          <label>{t("accountname")}</label>
        </div>
        <Box display="flex" justifyContent="center" alignItems="center">
          <div>
            <input
              type="text"
              value={accountName}
              className="input"
              onChange={(event) => setAccountName(event.target.value)}
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
        <div style={{ textAlign: "left", paddingLeft: "3vw" }}>
          <label>{t("phonenumber")}</label>
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
          <button
            onClick={checkLogin}
            disabled={isLoading}
            style={{
              margin: "10px",
              backgroundColor: "#2F69F6",
              color: "#e0f2f1",
            }}
          >
            {isLoading ? t("loginnow") : t("login")}
          </button>
        </Box>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <label style={{ marginRight: "5px" }}>{t("donthaveanaccount")}</label>
          <Link underline="none" onClick={moveSignUpScreen}>
            {t("signup")}
          </Link>
        </div>
      </div>
    </>
  );
};

export default LogIn;
