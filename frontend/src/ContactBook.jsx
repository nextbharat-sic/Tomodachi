import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Box from "@mui/material/Grid";
import { useTranslation } from "react-i18next";
import postInformation from "./clients/postinformation.js";

const ContactBook = () => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const userID = useSelector((state) => state.userID);
  const accountName = useSelector((state) => state.accountName);
  const phoneNumber = useSelector((state) => state.phoneNumber);
  const dispatch = useDispatch();

  const [contactBookData, setContactData] = useState({
    userId: userID,
    category: "contactBook",
    contactName: "",
    contactNumber: "",
    description: "",
    accountName: accountName,
    phoneNumber: phoneNumber,
  });

  const homePageStatus = () => {
    const storePage = { type: "CHANGE_PAGE_STATE", payload: "HomePage" };
    dispatch(storePage);
  };

  const handleInputDataChange = (event) => {
    const { name, value } = event.target;
    setContactData({
      ...contactBookData,
      [name]: value,
    });
  };

  const confirmUpload = (event) => {
    event.preventDefault();

    const isConfirm = confirm(t("confirmUpload"));
    if (isConfirm) {
      setIsLoading(true);
      uploadContactBookInfo();
    }
  };

  const uploadContactBookInfo = async () => {
    try {
      const contactBookInformation = {
        userId: contactBookData.userId,
        category: contactBookData.category,
        title: contactBookData.contactName,
        contactNumber: contactBookData.contactNumber,
        description: contactBookData.description,
        accountName: contactBookData.accountName,
        phoneNumber: contactBookData.phoneNumber,
      };

      const response = await postInformation(contactBookInformation);

      if (response.status === "Success") {
        setIsLoading(false);
        homePageStatus();
        alert(t("uploadCompleted"));
      } else {
        setIsLoading(false);
        alert(t("uploadFailed"));
      }
    } catch (error) {
      setIsLoading(false);
      console.error(t("errorUploading"), error);
    }
  };

  return (
    <>
      <div>
        <form onSubmit={confirmUpload}>
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
              required
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
              {isLoading ? t("uploadNow") : t("upload")}
            </button>
          </Box>
        </form>
      </div>
    </>
  );
};

export default ContactBook;
