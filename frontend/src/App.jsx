import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import SignUp from "./SignUp.jsx";
import UploadJobInformation from "./UploadJobInformation.jsx";
import "./App.css";

function App() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [displayPage, setDisplayPage] = useState("");

  const signInState = useSelector((state) => state.isSignIn);
  const pageStatus = useSelector((state) => state.pageStatus);

  useEffect(() => {
    setIsSignUp(signInState);
    setDisplayPage(pageStatus);
  }, [signInState, pageStatus]);

  return (
    <>
      {!isSignUp ? <SignUp /> : ""}
      {isSignUp && pageStatus == "PostJobPage" ? <UploadJobInformation /> : ""}
    </>
  );
}

export default App;
