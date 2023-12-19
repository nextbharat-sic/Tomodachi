import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Box from "@mui/material/Grid";
import postUserInformation from "./clients/postuserinformation.js";
import Modal from "./component/Modal.jsx";

const SignUp = () => {
  const [userName, setUserName] = useState("tentative");
  const [accountName, setAccountName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [privacyPolicyCheck, setPrivacyPolicyCheck] = useState(false);
  const dispatch = useDispatch();
  const [isModalOpen, setModalIsOpen] = useState(false);

  const handleOpen = () => {
    setModalIsOpen(true);
  };

  const handleClose = () => {
    setModalIsOpen(false);
  };

  const signUpStatus = (userID) => {
    const storeIsSignIn = { type: "SIGNIN_STATE", payload: true };
    const storePage = { type: "CHANGE_PAGE_STATE", payload: "PostJobPage" };
    const storeUserID = { type: "SET_USER_ID", payload: userID };
    const storeAccountName = { type: "SET_ACCOUNT_NAME", payload: accountName };
    const storePhoneNumber = { type: "SET_PHONE_NUMBER", payload: phoneNumber };
    dispatch(storeIsSignIn);
    dispatch(storePage);
    dispatch(storeUserID);
    dispatch(storeAccountName);
    dispatch(storePhoneNumber);
  };

  const createUser = async () => {
    setIsLoading(true);
    if (!isValidate()) {
      setIsLoading(false);
      return;
    }

    const userInformation = {
      userName: userName,
      accountName: accountName,
      phoneNumber: phoneNumber,
      privacyPolicyCheck: privacyPolicyCheck,
    };

    const result = await postUserInformation(userInformation);
    if (result.status == "Success") {
      setIsLoading(false);
      signUpStatus(result.userID);
      alert("User Registration is completed!");
    } else if (result.status == "UAN Existed") {
      setIsLoading(false);
      alert("Account Name already Exists!");
    } else if (result.status == "UPN Existed") {
      setIsLoading(false);
      alert("Phone Number already Exists!");
    } else {
      setIsLoading(false);
      alert("User Registration is Failed!");
    }
  };

  const isValidate = () => {
    const formatter = /^[0-9]{10}$/;

    if (accountName == "") {
      alert("Input Account name!");
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
      {isModalOpen ? <Modal onClose={handleClose} /> : ""}
      <div>
        <h2 style={{ textAlign: "center" }}>Sign Up</h2>
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
              }}
            ></input>
          </div>
        </Box>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          marginTop="2vh"
        ></Box>

        <div style={{ margin: "10px" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div>
              <input
                type="radio"
                onChange={() => setPrivacyPolicyCheck(true)}
              />
            </div>
            <div
              style={{
                marginLeft: "10px",
                fontSize: "90%",
              }}
            >
              I hereby accept terms and conditions &{" "}
              <span onClick={handleOpen} style={{ color: "blue" }}>
                privacy policy
              </span>{" "}
              of the service
            </div>
          </div>
        </div>
        <Box display="flex" justifyContent="center" alignItems="center">
          <button
            onClick={createUser}
            disabled={isLoading}
            style={{
              margin: "10px",
              backgroundColor: "#2F69F6",
              color: "#e0f2f1",
            }}
          >
            {isLoading ? "Create now..." : "Sign Up"}
          </button>
        </Box>
      </div>
    </>
  );
};

export default SignUp;
