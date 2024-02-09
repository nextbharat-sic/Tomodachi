import { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import updateInformation from "../clients/updateinformation.js";
import Box from "@mui/material/Grid";
import { useTranslation } from "react-i18next";

const UpdateCareerRelatedNews = (props) => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const userID = useSelector((state) => state.userID);
  const accountName = useSelector((state) => state.accountName);
  const phoneNumber = useSelector((state) => state.phoneNumber);
  const dispatch = useDispatch();

  const [careerRelatedNewsData, setcareerRelatedNewsData] = useState({
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

  const homePageStatus = () => {
    const storePage = { type: "CHANGE_PAGE_STATE", payload: "HomePage" };
    dispatch(storePage);
  };

  const handleInputDataChange = (event) => {
    const { name, value } = event.target;
    setcareerRelatedNewsData({
      ...careerRelatedNewsData,
      [name]: value,
    });
  };

  const confirmUpdate = (event) => {
    event.preventDefault();

    const isConfirm = confirm(t("confirmUpdate"));
    if (isConfirm) {
      setIsLoading(true);
      updateCareerRelatedNewsInfo();
    }
  };

  const updateCareerRelatedNewsInfo = async () => {
    try {
      const carreerRelatedNewsInformation = {
        postId: props.data.PID,
        userId: careerRelatedNewsData.userId,
        category: careerRelatedNewsData.category,
        forWhichThanda: careerRelatedNewsData.forWhichThanda,
        title: careerRelatedNewsData.title,
        deadlineDate: careerRelatedNewsData.deadlineDate,
        modeOfJob: careerRelatedNewsData.modeOfJob,
        contactNumber: careerRelatedNewsData.contactNumber,
        description: careerRelatedNewsData.description,
        image: careerRelatedNewsData.image,
        accountName: careerRelatedNewsData.accountName,
        phoneNumber: careerRelatedNewsData.phoneNumber,
      };

      const response = await updateInformation(carreerRelatedNewsInformation);

      if (response.status === "Success") {
        setIsLoading(false);
        homePageStatus();
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
              value={careerRelatedNewsData.title}
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
              value={careerRelatedNewsData.description}
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

export default UpdateCareerRelatedNews;
