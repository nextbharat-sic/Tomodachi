import { useState } from "react";
import { useDispatch } from "react-redux";
import Link from "@mui/material/Link";
import checkLoginInformation from "./clients/checklogininformation.js";
import Box from "@mui/material/Grid";

const LogIn = () => {
  const [accountName, setAccountName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const dispatch = useDispatch();

  const logInStatus = (userID) => {
    const storeIsSignIn = { type: "SIGNIN_STATE", payload: true };
    const storePage = { type: "CHANGE_PAGE_STATE", payload: "HomePage" };
    const storeUserID = { type: "SET_USER_ID", payload: userID };
    const storeAccountName = { type: "SET_ACCOUNT_NAME", payload: accountName };
    const storePhoneNumber = { type: "SET_PHONE_NUMBER", payload: phoneNumber };
    dispatch(storeIsSignIn);
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
    const logInInformation = {
      accountName: accountName,
      phoneNumber: phoneNumber,
    };

    const result = await checkLoginInformation(logInInformation);
    if (result.status == "Match") {
      logInStatus(result.userID);
    } else if (result.status == "Unmatch") {
      alert("Account name or phone number is incorrect!");
    } else {
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
            style={{
              margin: "10px",
              backgroundColor: "#2F69F6",
              color: "#e0f2f1",
            }}
          >
            Log In
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
