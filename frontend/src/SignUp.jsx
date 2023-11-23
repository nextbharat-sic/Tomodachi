import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import postUserInformation from "./clients/postuserinformation.js";

const SignUp = () => {
  const [userName, setUserName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [privacyPolicyCheck, setPrivacyPolicyCheck] = useState(false);
  const dispatch = useDispatch();

  const signUpStatus = () => {
    const isSignInStatus = { type: "SIGNIN_STATE", payload: true };
    const pageStatus = { type: "CHANGE_PAGE_STATE", payload: "PostJobPage" };
    dispatch(isSignInStatus);
    dispatch(pageStatus);
  };

  const createUser = async () => {
    setIsLoading(true);
    if (!isValidate()) {
      setIsLoading(false);
      return;
    }

    const userInformation = {
      userName: userName,
      phoneNumber: phoneNumber,
      privacyPolicyCheck: privacyPolicyCheck,
    };

    const result = await postUserInformation(userInformation);
    if (result == "Success") {
      setIsLoading(false);
      alert("User Registration is completed!");
      signUpStatus();
    } else {
      setIsLoading(false);
      alert("User Registration is Failed!");
    }
  };

  const isValidate = () => {
    const formatter = /^[0-9]{10}$/;

    if (userName == "") {
      alert("Input Username!");
      return false;
    }

    if (!formatter.test(phoneNumber)) {
      alert("Phone Number must be 10 digits!");
      return false;
    }

    if (privacyPolicyCheck != true) {
      alert("You need to check privacy policy!");
      return false;
    }
    return true;
  };

  return (
    <>
      <h2>Sign Up</h2>
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
        <div>
          <label>
            <input type="radio" onChange={() => setPrivacyPolicyCheck(true)} />
            <span>
              I Accept Terms and Conditions, Privacy Policy of the Service
            </span>
          </label>
        </div>
        <button onClick={createUser} disabled={isLoading}>
          {isLoading ? "Create now..." : "Sign Up"}
        </button>
      </div>
    </>
  );
};

export default SignUp;
