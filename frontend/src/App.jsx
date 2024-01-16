import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Header from "./component/Header.jsx";
import Footer from "./component/Footer.jsx";
import Home from "./Home.jsx";
import SignUp from "./SignUp.jsx";
import LogIn from "./LogIn.jsx";
import SelectCategory from "./SelectCategory.jsx";
import CheckOtp from "./CheckOtp.jsx";
import "./App.css";

import Box from "@mui/material/Grid";

function App() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [displayPage, setDisplayPage] = useState("");

  const signInStatus = useSelector((state) => state.isSignIn);
  const pageStatus = useSelector((state) => state.pageStatus);

  const contentHeight = pageStatus == "HomePage" ? "88vh" : "94vh";

  useEffect(() => {
    setIsSignUp(signInStatus);
    setDisplayPage(pageStatus);
  }, [signInStatus, pageStatus]);

  return (
    <>
      <Box diplay="flex" flexDirection="column">
        {pageStatus == "HomePage" ? (
          <Box height={Header.headerHeight}>
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
        </Box>
        <Box height={Footer.footerHeight}>
          <Footer />
        </Box>
      </Box>
    </>
  );
}

export default App;
