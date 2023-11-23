import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import SignUp from './SignUp.jsx'
import UploadJobInformation from './UploadJobInformation.jsx'
import './App.css'

function App() {
  const [isSignUp, setIsSignUp] = useState(false);
  const isSignInState = useSelector((state) => state.isSignIn);

  useEffect(() => {
    setIsSignUp(isSignInState);
  }, [isSignInState]);
  
  return (
    <>
      { !isSignUp ? <SignUp /> :"" }
      { isSignUp ? <UploadJobInformation /> : "" }
    </>
  )
}

export default App
