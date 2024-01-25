import { useState } from "react";
import { useDispatch } from "react-redux";
import Box from "@mui/material/Grid";
import generateSignUpOtpCode from "./clients/generatesignupotpcode.js";
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
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const handleOpen = () => {
    setModalIsOpen(true);
  };

  const handleClose = () => {
    setModalIsOpen(false);
  };

  const handleInputChange = (event) => {
    setAccountName(event.target.value);
    if (event.target.value.includes(" ")) {
      setIsButtonDisabled(true);
    } else {
      setIsButtonDisabled(false);
    }
  };

  const signUpStatus = (userID) => {
    const storePage = { type: "CHANGE_PAGE_STATE", payload: "CheckOtpPage" };
    const storeUserID = { type: "SET_USER_ID", payload: userID };
    const storeAccountName = { type: "SET_ACCOUNT_NAME", payload: accountName };
    const storePhoneNumber = { type: "SET_PHONE_NUMBER", payload: phoneNumber };
    const storePrivacyPolicyCheck = {
      type: "SET_PRIVACY_POLICY_CHECK",
      payload: privacyPolicyCheck,
    };
    dispatch(storePage);
    dispatch(storeUserID);
    dispatch(storeAccountName);
    dispatch(storePhoneNumber);
    dispatch(storePrivacyPolicyCheck);
  };

  const createUser = async () => {
    setIsLoading(true);
    if (!isValidate()) {
      setIsLoading(false);
      return;
    }

    const storeClientPage = { type: "SET_CLIENT_PAGE", payload: "signUp" };
    dispatch(storeClientPage);

    const userInformation = {
      accountName: accountName,
      phoneNumber: phoneNumber,
      privacyPolicyCheck: privacyPolicyCheck,
    };

    const result = await generateSignUpOtpCode(userInformation);
    if (result.status == "Success") {
      setIsLoading(false);
      signUpStatus(result.userID);
    } else if (result.status == "UAN Existed") {
      setIsLoading(false);
      alert(t("accountNameExist"));
    } else if (result.status == "UPN Existed") {
      setIsLoading(false);
      alert(t("phoneNumberExist"));
    } else {
      setIsLoading(false);
      alert(t("signUpFailed"));
    }
  };

  const isValidate = () => {
    const formatter = /^[0-9]{10}$/;

    if (accountName == "") {
      alert(t("inputAccountName"));
      return false;
    }

    if (!formatter.test(phoneNumber)) {
      alert(t("phoneNumberDigits"));
      return false;
    }

    if (privacyPolicyCheck != true) {
      alert(t("needToCheckPrivacyPolicy"));
      return false;
    }
    return true;
  };

  return (
    <>
      {isModalOpen ? <Modal onClose={handleClose} /> : ""}
      <div>
        <h2 style={{ textAlign: "center" }}>{t("signUp")}</h2>
        <div style={{ textAlign: "left", paddingLeft: "3vw" }}>
          <label>{t("accountName")}</label>
        </div>
        <Box display="flex" justifyContent="center" alignItems="center">
          <div>
            <input
              type="text"
              value={accountName}
              className="input"
              onChange={handleInputChange}
              style={{
                width: "86vw",
                margin: "10px",
                height: "5vh",
                borderRadius: "10px",
              }}
            ></input>
          </div>
        </Box>
        {isButtonDisabled ? (
          <Box>
            <div
              style={{
                fontSize: "0.5em",
                color: "red",
                paddingLeft: "5vw",
                marginBottom: "1vh",
              }}
            >
              {t("includeSpaces")}
            </div>
          </Box>
        ) : (
          <Box></Box>
        )}
        <div style={{ textAlign: "left", paddingLeft: "3vw" }}>
          <label>{t("phoneNumber")}</label>
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
              {t("privacyPolicySentence")}
              <span onClick={handleOpen} style={{ color: "blue" }}>
                {t("privacyPolicy")}
              </span>
              {t("ofTheService")}
            </div>
          </div>
        </div>
        <Box display="flex" justifyContent="center" alignItems="center">
          {isButtonDisabled ? (
            <button
              style={{
                margin: "10px",
                backgroundColor: "#b3b3b3b3",
                color: "black",
              }}
            >
              {t("signUp")}
            </button>
          ) : (
            <button
              onClick={createUser}
              disabled={isLoading}
              style={{
                margin: "10px",
                backgroundColor: "#2F69F6",
                color: "#e0f2f1",
              }}
            >
              {isLoading ? t("createNow") : t("signUp")}
            </button>
          )}
        </Box>
      </div>
    </>
  );
};

export default SignUp;
