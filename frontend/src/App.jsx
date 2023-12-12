import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Header from "./component/Header.jsx";
import Footer from "./component/Footer.jsx";
import Home from "./Home.jsx";
import SignUp from "./SignUp.jsx";
import LogIn from "./LogIn.jsx";
import PostJobInformation from "./PostJobInformation.jsx";
import "./App.css";

import Box from "@mui/material/Grid";

function App() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [displayPage, setDisplayPage] = useState("");

  const signInStatus = useSelector((state) => state.isSignIn);
  const pageStatus = useSelector((state) => state.pageStatus);

  useEffect(() => {
    setIsSignUp(signInStatus);
    setDisplayPage(pageStatus);
  }, [signInStatus, pageStatus]);

  return (
    <>
      {pageStatus == "HomePage" ? <Header /> : ""}
      <Box
        justifyContent="center"
        alignItems="center"
        text-align="center"
        height="100%"
        backgroundColor="#ffffff"
      >
        {pageStatus == "HomePage" ? <Home /> : ""}
        {pageStatus == "LogIn" ? <LogIn /> : ""}
        {!isSignUp && pageStatus == "SignUpPage" ? <SignUp /> : ""}
        {isSignUp && pageStatus == "PostJobPage" ? <PostJobInformation /> : ""}
      </Box>
      <Footer />
    </>
  );
}

export default App;
