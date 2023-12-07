import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Header from "./component/Header.jsx";
import Footer from "./component/Footer.jsx";
import Home from "./Home.jsx";
import SignUp from "./SignUp.jsx";
import PostJobInformation from "./PostJobInformation.jsx";
//import "./App.css";
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
      <Header />
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100%"
      >
        {pageStatus == "HomePage" ? <Home /> : ""}
        {!isSignUp && pageStatus == "SignUpPage" ? <SignUp /> : ""}
        {isSignUp && pageStatus == "PostJobPage" ? <PostJobInformation /> : ""}
      </Box>
      <Footer />
    </>
  );
}

export default App;
