// Copyright © 2025 Suzuki Motor Corporation All Rights Reserved
import { useState } from "react";
import { useDispatch } from "react-redux";
import Box from "@mui/material/Grid";
import updateInformation from "../clients/updateinformation.js";
import { useTranslation } from "react-i18next";

const UpdateContactBook = (props) => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const [contactBookData, setContactData] = useState({
    postId: props.data.PID,
    userId: props.data.PUID,
    category: props.data.PIT,
    forWhichThanda: props.data.PFT,
    contactName: props.data.PTI,
    contactNumber: props.data.PCN,
    deadlineDate: props.data.PDD,
    modeOfJob: props.data.PMJ,
    description: props.data.PDE,
    image: "",
    accountName: props.data.PAN,
    phoneNumber: props.data.PPN,
  });

  const refreshPage = async () => {
    const storeInitialPage = { type: "CHANGE_PAGE_STATE", payload: "" };
    await dispatch(storeInitialPage);
    const storePage = { type: "CHANGE_PAGE_STATE", payload: "MyPostPage" };
    dispatch(storePage);
  };

  const handleInputDataChange = (event) => {
    const { name, value } = event.target;
    setContactData({
      ...contactBookData,
      [name]: value,
    });
  };

  const checkValidateAndUpdate = (event) => {
    event.preventDefault();

    if (isValidate()) {
      const isConfirm = confirm(t("confirmUpdate"));
      if (isConfirm) {
        setIsLoading(true);
        updateContactBookInfo();
      }
    }
  };

  const updateContactBookInfo = async () => {
    try {
      const contactBookInformation = {
        postId: props.data.PID,
        userId: contactBookData.userId,
        category: contactBookData.category,
        forWhichThanda: contactBookData.forWhichThanda,
        title: contactBookData.contactName,
        deadlineDate: contactBookData.deadlineDate,
        modeOfJob: contactBookData.modeOfJob,
        contactNumber: contactBookData.contactNumber,
        description: contactBookData.description,
        image: contactBookData.image,
        accountName: contactBookData.accountName,
        phoneNumber: contactBookData.phoneNumber,
      };

      const response = await updateInformation(contactBookInformation);

      if (response.status === "Success") {
        setIsLoading(false);
        refreshPage();
        alert(t("updateCompleted"));
      } else {
        setIsLoading(false);
        alert(t("updateFailed"));
      }
    } catch (error) {
      setIsLoading(false);
      console.error(t("errorUploading"), error);
    }
  };

  const isValidate = () => {
    const formatter = /^[0-9]{10}$/;

    if (!formatter.test(contactBookData.contactNumber)) {
      alert(t("phoneNumberDigits"));
      return false;
    }

    return true;
  };

  return (
    <>
      <div>
        <form onSubmit={checkValidateAndUpdate}>
          <div style={{ textAlign: "left", paddingLeft: "3vw" }}>
            <label>{t("contactName")}</label>
          </div>
          <Box display="flex" justifyContent="center" alignItems="center">
            <input
              name="contactName"
              placeholder={t("writeContactName")}
              value={contactBookData.contactName}
              onChange={handleInputDataChange}
              style={{
                width: "86vw",
                margin: "10px",
                height: "5vh",
                borderRadius: "10px",
                borderWidth: "1px",
              }}
              required
            />
          </Box>

          <div style={{ textAlign: "left", paddingLeft: "3vw" }}>
            <label>{t("contactNumber")}</label>
          </div>
          <Box display="flex" justifyContent="center" alignItems="center">
            <input
              name="contactNumber"
              placeholder={t("writeContactNumber")}
              value={contactBookData.contactNumber}
              onChange={handleInputDataChange}
              style={{
                width: "86vw",
                margin: "10px",
                height: "5vh",
                borderRadius: "10px",
                borderWidth: "1px",
              }}
              required
            />
          </Box>

          <div style={{ textAlign: "left", paddingLeft: "3vw" }}>
            <label>{t("description")}</label>
          </div>
          <Box display="flex" justifyContent="center" alignItems="center">
            <textarea
              rows="8"
              name="description"
              placeholder={t("writeDescription")}
              value={contactBookData.description}
              onChange={handleInputDataChange}
              style={{
                width: "86vw",
                margin: "10px",
                borderRadius: "10px",
              }}
            ></textarea>
          </Box>
          <Box display="flex" justifyContent="center" alignItems="center">
            <button
              type="submit"
              disabled={isLoading}
              style={{
                backgroundColor: "#2F69F6",
                color: "#e0f2f1",
              }}
            >
              {isLoading ? t("updateNow") : t("update")}
            </button>
          </Box>
        </form>
      </div>
    </>
  );
};

export default UpdateContactBook;
