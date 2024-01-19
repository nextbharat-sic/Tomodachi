import { useState } from "react";
import { useDispatch } from "react-redux";
import Link from "@mui/material/Link";
import generateLogInOtpCode from "./clients/generateloginotpcode.js";
import Box from "@mui/material/Grid";

const LogIn = () => {
  const [accountName, setAccountName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const logInStatus = () => {
    const storePage = { type: "CHANGE_PAGE_STATE", payload: "CheckOtpPage" };
    const storeAccountName = { type: "SET_ACCOUNT_NAME", payload: accountName };
    const storePhoneNumber = { type: "SET_PHONE_NUMBER", payload: phoneNumber };

    dispatch(storePage);
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

    const result = await generateLogInOtpCode(logInInformation);
    if (result.status == "Success") {
      setIsLoading(false);
      logInStatus();
    } else if (result.status == "Unmatch") {
      setIsLoading(false);
      alert("Account name or phone number is incorrect!");
    } else {
      setIsLoading(false);
      alert("Please Try Again!");
    }
  };

  return (
    <>
      <div>
        <h2 style={{ textAlign: "center" }}>Log In</h2>
        <div style={{ textAlign: "left", paddingLeft: "3vw" }}>
          <label>Account Name</label>
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
          <label>Phone Number</label>
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
            {isLoading ? "Log in now..." : "Log In"}
          </button>
        </Box>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <label style={{ marginRight: "5px" }}>Don't have an account?</label>
          <Link underline="none" onClick={moveSignUpScreen}>
            Sign up
          </Link>
        </div>
      </div>
    </>
  );
};

export default LogIn;
