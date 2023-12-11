import { useState } from "react";
import { useDispatch } from "react-redux";
import Link from "@mui/material/Link";
import checkLoginInformation from "./clients/checklogininformation.js";

const LogIn = () => {
  const [userName, setUserName] = useState("");
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

  const moveSignUpScreen = () => {
    const pageStatus = { type: "CHANGE_PAGE_STATE", payload: "SignUpPage" };
    dispatch(pageStatus);
  };

  const checkLogin = async () => {
    const logInInformation = {
      userName: userName,
      phoneNumber: phoneNumber,
    };

    const result = await checkLoginInformation(logInInformation);
    console.log(result.status);
    console.log(result.userID);
    if (result.status == "Match") {
      logInStatus(result.userID);
    } else if (result.status == "Unmatch") {
      alert("User name or phone number is incorrect!");
    } else {
      alert("Please Try Again!");
    }
  };

  return (
    <>
      <h2>Log In</h2>
      <div>
        <div>
          <label>User Name</label>
        </div>
        <div>
          <input
            type="text"
            value={userName}
            onChange={(event) => setUserName(event.target.value)}
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
