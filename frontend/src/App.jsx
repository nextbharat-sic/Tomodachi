import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Header from "./component/Header.jsx";
import Footer from "./component/Footer.jsx";
import Home from "./Home.jsx";
import SignUp from "./SignUp.jsx";
import UploadJobInformation from "./UploadJobInformation.jsx";
import "./App.css";

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
      <Header isSignIn={isSignUp} />
      {pageStatus == "HomePage" ? <Home /> : ""}
      {!isSignUp && pageStatus == "SignUpPage" ? <SignUp /> : ""}
      {isSignUp && pageStatus == "PostJobPage" ? <UploadJobInformation /> : ""}
      <Footer />
    </>
  );
}

export default App;
