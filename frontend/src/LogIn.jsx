import { useState } from "react";
import { useDispatch } from "react-redux";
import Link from "@mui/material/Link";
import checkLoginInformation from "./clients/checklogininformation.js";

const LogIn = () => {
  const [accountName, setAccountName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const dispatch = useDispatch();

  const logInStatus = (userID) => {
    const storeIsSignIn = { type: "SIGNIN_STATE", payload: true };
    const storePage = { type: "CHANGE_PAGE_STATE", payload: "HomePage" };
    const storeUserID = { type: "SET_USER_ID", payload: userID };
    dispatch(storeIsSignIn);
    dispatch(storePage);
    dispatch(storeUserID);
  };

  const pendingForPost = () => {
    const storeAccountName = {
      type: "SET_POST_ACCOUNT_NAME",
      payload: accountName,
    };
    const storePhoneNumber = {
      type: "SET_POST_PHONE_NUMBER",
      payload: phoneNumber,
    };
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
      pendingForPost();
      logInStatus(result.userID);
    } else if (result.status == "Unmatch") {
      alert("Account name or phone number is incorrect!");
    } else {
      alert("Please Try Again!");
    }
  };

  return (
    <>
      <h2>Log In</h2>
      <div>
        <div>
          <label>Account Name</label>
        </div>
        <div>
          <input
            type="text"
            value={accountName}
            onChange={(event) => setAccountName(event.target.value)}
          ></input>
        </div>
        <div>
          <label>Phone Number</label>
        </div>
        <div>
          <input
            type="text"
            value={phoneNumber}
            placeholder="Number(10 digits)"
            onChange={(event) => setPhoneNumber(event.target.value)}
          ></input>
        </div>
        <button onClick={checkLogin}>Log in</button>
        <div>
          <label>Don't have an account?</label>
          <Link underline="none" onClick={moveSignUpScreen}>
            {" Sign up"}
          </Link>
        </div>
      </div>
    </>
  );
};

export default LogIn;
