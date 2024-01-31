import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Box from "@mui/material/Grid";
import Header from "./component/Header.jsx";
import Home from "./Home.jsx";
import SignUp from "./SignUp.jsx";
import LogIn from "./LogIn.jsx";
import SelectCategory from "./SelectCategory.jsx";
import CheckOtp from "./CheckOtp.jsx";
import Verified from "./Verified.jsx";
import "./App.css";

function App() {
  const checkForUpdates = async () => {
    if ("serviceWorker" in navigator) {
      try {
        const registration = await navigator.serviceWorker.ready;
        registration.active.postMessage({
          type: "CHECK_FOR_UPDATES",
        });
      } catch (error) {
        console.error("Error communicating with service worker:", error);
      }
    }
  };

  checkForUpdates();

  const [isSignUp, setIsSignUp] = useState(false);
  const [displayPage, setDisplayPage] = useState("");

  const signInStatus = useSelector((state) => state.isSignIn);
  const pageStatus = useSelector((state) => state.pageStatus);

  const contentHeight = pageStatus == "HomePage" ? "94vh" : "100vh";

  ///////////////////
  //レビュー用
  const test1 = useSelector((state) => state.nextAction);
  const test2 = useSelector((state) => state.userID);
  const test3 = useSelector((state) => state.accountName);
  const test4 = useSelector((state) => state.phoneNumber);
  const test5 = useSelector((state) => state.privacyPolicyCheck);
  const test6 = useSelector((state) => state.clientPage);
  console.log("nextAction : " + test1);
  console.log("userID : " + test2);
  console.log("accountName : " + test3);
  console.log("phoneNumber : " + test4);
  console.log("privacyPolicyCheck : " + test5);
  console.log("clientPage : " + test6);
  ///////////////////

  useEffect(() => {
    setIsSignUp(signInStatus);
    setDisplayPage(pageStatus);
  }, [signInStatus, pageStatus]);

  return (
    <>
      <Box diplay="flex" flexDirection="column">
        {pageStatus == "HomePage" ? (
          <Box>
            <Header />
          </Box>
        ) : (
          ""
        )}

        {/* TODO height is make variable changes */}
        <Box
          justifyContent="center"
          alignItems="center"
          text-align="center"
          overflow="auto"
          height={contentHeight}
        >
          {pageStatus == "HomePage" ? <Home /> : ""}
          {pageStatus == "LogIn" ? <LogIn /> : ""}
          {!isSignUp && pageStatus == "SignUpPage" ? <SignUp /> : ""}
          {!isSignUp && pageStatus == "CheckOtpPage" ? <CheckOtp /> : ""}
          {isSignUp && pageStatus == "PostPage" ? <SelectCategory /> : ""}
          {pageStatus == "OtpVerifiedPage" ? <Verified /> : ""}
        </Box>
      </Box>
    </>
  );
}

export default App;
