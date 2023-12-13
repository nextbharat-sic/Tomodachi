import { useState } from "react";
import { useDispatch } from "react-redux";
import Box from "@mui/material/Grid";
import postUserInformation from "./clients/postuserinformation.js";

const SignUp = () => {
  const [userName, setUserName] = useState("tentative");
  const [accountName, setAccountName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [privacyPolicyCheck, setPrivacyPolicyCheck] = useState(false);
  const dispatch = useDispatch();

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
    } else if (result.status == "Existed") {
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
        >
          <div
            style={{
              marginBottom: "2vh",
              paddingLeft: "4vw",
              paddingRight: "4vw",
              width: "80vw",
              height: "30vh",
              overflowX: "hidden",
              overflowY: "auto",
              textAlign: "justify",
            }}
          >
            <h4 style={{ textAlign: "center" }}>Terms and Condition</h4>
            It is a good platform to learn programming. It is an educational
            website. Prepare for the Recruitment drive of product based
            companies like Microsoft, Amazon, Adobe etc with a free online
            placement preparation course. The course focuses on various MCQ's &
            Coding question likely to be asked in the interviews & make your
            upcoming placement season efficient and successful. Also, any geeks
            can help other geeks by writing articles on the GeeksforGeeks,
            publishing articles follow few steps that are Articles that need
            little modification /improvement from reviewers are published first.
            To quickly get your articles reviewed, please refer existing
            articles, their formatting style, coding style, and try to make you
            are close to them. In case you are a beginner, you may refer
            Guidelines to write an Article
          </div>
        </Box>

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
              I hereby accept terms and conditions & privacy policy of the
              service
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
