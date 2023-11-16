import { useState } from "react";
import postUserInformation from "./clients/postuserinformation.js";

const SignUp = () => {
  const [userName, setUserName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const createUser = async () => {
    const userInformation = {
      userName: { userName },
      phoneNumber: { phoneNumber },
    };
    // console.log({ userInformation });
    await postUserInformation(userInformation);
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
            onChange={(event) => setPhoneNumber(event.target.value)}
          ></input>
        </div>
        <div>
          <input type="radio" />I Accept Terms and Conditions, Privacy Policy of
          the Service
        </div>
        <button onClick={createUser}>Sign Up</button>
      </div>
    </>
  );
};

export default SignUp;
