// Copyright © 2025 Suzuki Motor Corporation All Rights Reserved
import { useState } from "react";
import { useDispatch } from "react-redux";
import updateInformation from "../clients/updateinformation.js";
import Box from "@mui/material/Grid";
import { useTranslation } from "react-i18next";

const UpdateJobMarket = (props) => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  let date = new Date();
  let localDate =
    date.getFullYear() +
    "-" +
    (date.getMonth() + 1).toString().padStart(2, "0") +
    "-" +
    date.getDate().toString().padStart(2, "0");

  const [jobMarketData, setJobMarketData] = useState({
    postId: props.data.PID,
    userId: props.data.PUID,
    category: props.data.PIT,
    forWhichThanda: props.data.PFT,
    title: props.data.PTI,
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
    setJobMarketData({
      ...jobMarketData,
      [name]: value,
    });
  };

  const confirmUpdate = (event) => {
    event.preventDefault();
    const deadlineValidation = checkDeadlineDate();
    if (!deadlineValidation) {
      alert(t("deadlineDatePassed"));
    } else {
      const isConfirm = confirm(t("confirmUpdate"));
      if (isConfirm) {
        setIsLoading(true);
        updateJobMarketInfo();
      }
    }
  };

  const checkDeadlineDate = () => {
    if (jobMarketData.deadlineDate >= localDate) {
      return true;
    }
    return false;
  };

  const updateJobMarketInfo = async () => {
    try {
      const jobMarketInformation = {
        postId: props.data.PID,
        userId: jobMarketData.userId,
        category: jobMarketData.category,
        forWhichThanda: jobMarketData.forWhichThanda,
        title: jobMarketData.title,
        deadlineDate: jobMarketData.deadlineDate,
        modeOfJob: jobMarketData.modeOfJob,
        contactNumber: jobMarketData.contactNumber,
        description: jobMarketData.description,
        image: jobMarketData.image,
        accountName: jobMarketData.accountName,
        phoneNumber: jobMarketData.phoneNumber,
      };

      const response = await updateInformation(jobMarketInformation);

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

  return (
    <>
      <div>
        <form onSubmit={confirmUpdate}>
          <div style={{ textAlign: "left", paddingLeft: "3vw" }}>
            <label>{t("title")}</label>
          </div>
          <Box display="flex" justifyContent="center" alignItems="center">
            <input
              type="text"
              name="title"
              placeholder={t("writeTitle")}
              value={jobMarketData.title}
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
            <label>{t("deadlineDate")}</label>
          </div>
          <Box display="flex" justifyContent="center" alignItems="center">
            <input
              type="date"
              name="deadlineDate"
              value={jobMarketData.deadlineDate}
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
            <label>{t("modeOfJob")}</label>
          </div>
          <Box display="flex" justifyContent="center" alignItems="center">
            <select
              name="modeOfJob"
              value={jobMarketData.modeOfJob}
              onChange={handleInputDataChange}
              style={{
                width: "86vw",
                margin: "10px",
                height: "5vh",
                borderRadius: "10px",
              }}
            >
              <option value="indoor">{t("indoor")}</option>
              <option value="outdoor">{t("outdoor")}</option>
            </select>
          </Box>

          <div style={{ textAlign: "left", paddingLeft: "3vw" }}>
            <label>{t("description")}</label>
          </div>
          <Box display="flex" justifyContent="center" alignItems="center">
            <textarea
              rows="8"
              name="description"
              placeholder={t("writeDescription")}
              value={jobMarketData.description}
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
              {isLoading ? t("updateNow") : t("update")}
            </button>
          </Box>
        </form>
      </div>
    </>
  );
};

export default UpdateJobMarket;
