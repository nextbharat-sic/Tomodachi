import { useState } from "react";
import Link from "@mui/material/Link";

const LogIn = () => {
  const [userName, setUserName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  return (
    <>
      <h2>Log In</h2>
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
            placeholder="Number(10 digits)"
            onChange={(event) => setPhoneNumber(event.target.value)}
          ></input>
        </div>
        <button>Log in</button>
        <div>
          <label>Don't have an account?</label>
          <Link underline="none"> Sign up</Link>
        </div>
      </div>
    </>
  );
};

export default LogIn;
