import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Box from "@mui/material/Grid";
import postUserInformation from "./clients/postuserinformation.js";
import generateOtpCode from "./clients/generateotpcode.js";
import Modal from "./component/Modal.jsx";
import { useTranslation } from "react-i18next";

const SignUp = () => {
  const { t } = useTranslation();
  const [accountName, setAccountName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [privacyPolicyCheck, setPrivacyPolicyCheck] = useState(false);
  const dispatch = useDispatch();
  const [isModalOpen, setModalIsOpen] = useState(false);

  const handleOpen = () => {
    setModalIsOpen(true);
  };

  const handleClose = () => {
    setModalIsOpen(false);
  };

  const signUpStatus = (userID) => {
    const storePage = { type: "CHANGE_PAGE_STATE", payload: "CheckOtpPage" };
    const storeUserID = { type: "SET_USER_ID", payload: userID };
    const storeAccountName = { type: "SET_ACCOUNT_NAME", payload: accountName };
    const storePhoneNumber = { type: "SET_PHONE_NUMBER", payload: phoneNumber };
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
      accountName: accountName,
      phoneNumber: phoneNumber,
      privacyPolicyCheck: privacyPolicyCheck,
    };

    const result = await generateOtpCode(userInformation);
    if (result.status == "Success") {
      setIsLoading(false);
      signUpStatus(result.userID);
    } else if (result.status == "UAN Existed") {
      setIsLoading(false);
      alert(t("accountnameexist"));
    } else if (result.status == "UPN Existed") {
      setIsLoading(false);
      alert(t("phonenumberexist"));
    } else {
      setIsLoading(false);
      alert(t("signupfailed"));
    }
  };

  const isValidate = () => {
    const formatter = /^[0-9]{10}$/;

    if (accountName == "") {
      alert(t("inputaccountname"));
      return false;
    }

    if (!formatter.test(phoneNumber)) {
      alert(t("phonenumber10digits"));
      return false;
    }

    if (privacyPolicyCheck != true) {
      alert(t("needtocheckprivacypolicy"));
      return false;
    }
    return true;
  };

  return (
    <>
      {isModalOpen ? <Modal onClose={handleClose} /> : ""}
      <div>
        <h2 style={{ textAlign: "center" }}>{t("signup")}</h2>
        <div style={{ textAlign: "left", paddingLeft: "3vw" }}>
          <label>{t("accountname")}</label>
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
          <label>{t("phonenumber")}</label>
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
        ></Box>

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
              {t("privacypolicysentence")}
              <span onClick={handleOpen} style={{ color: "blue" }}>
                {t("privacypolicy")}
              </span>
              {t("oftheservice")}
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
            {isLoading ? t("creatnow") : t("signup")}
          </button>
        </Box>
      </div>
    </>
  );
};

export default SignUp;
