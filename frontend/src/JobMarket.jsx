import { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import postInformation from "./clients/postinformation.js";
import Box from "@mui/material/Grid";
import { useTranslation } from "react-i18next";

const JobMarket = () => {
  const { t } = useTranslation();
  // const [imageFile, setImageFile] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const userID = useSelector((state) => state.userID);
  const accountName = useSelector((state) => state.accountName);
  const phoneNumber = useSelector((state) => state.phoneNumber);
  // const inputImageFile = useRef();
  const dispatch = useDispatch();
  let date = new Date();
  let localDate =
    date.getFullYear() +
    "-" +
    (date.getMonth() + 1).toString().padStart(2, "0") +
    "-" +
    date.getDate().toString().padStart(2, "0");
  // let localTime = date.toLocaleTimeString();

  const [jobMarketData, setJobMarketData] = useState({
    userId: userID,
    category: "jobMarket",
    forWhichThanda: "",
    title: "",
    deadlineDate: "",
    modeOfJob: "indoor",
    description: "",
    image: "",
    accountName: accountName,
    phoneNumber: phoneNumber,
  });

  const homePageStatus = () => {
    const storePage = { type: "CHANGE_PAGE_STATE", payload: "HomePage" };
    dispatch(storePage);
  };

  // const showImage = (event) => {
  //   setImageFile(URL.createObjectURL(event.target.files[0]));
  //   setJobMarketData({
  //     ...jobMarketData,
  //     image: event.target.files[0],
  //   });
  // };

  const handleInputDataChange = (event) => {
    const { name, value } = event.target;
    setJobMarketData({
      ...jobMarketData,
      [name]: value,
    });
  };

  const confirmUpload = (event) => {
    event.preventDefault();
    const deadlineValidation = checkDeadlineDate();
    if (!deadlineValidation) {
      alert(t("deadlineDatePassed"));
    } else {
      const isConfirm = confirm(t("confirmUpload"));
      if (isConfirm) {
        setIsLoading(true);
        uploadJobMarketInfo();
        // checkImageFile();
      }
    }
  };

  // const checkImageFile = () => {
  //   const File = inputImageFile.current.files[0];
  //   if (File && File.size > 0) {
  //     uploadFile();
  //   } else {
  //     uploadJobMarketInfo();
  //   }
  // };

  const checkDeadlineDate = () => {
    if (jobMarketData.deadlineDate >= localDate) {
      return true;
    }
    return false;
  };

  const uploadJobMarketInfo = async () => {
    try {
      const jobMarketInformation = {
        userId: jobMarketData.userId,
        category: jobMarketData.category,
        forWhichThanda: jobMarketData.forWhichThanda,
        title: jobMarketData.title,
        deadlineDate: jobMarketData.deadlineDate,
        modeOfJob: jobMarketData.modeOfJob,
        description: jobMarketData.description,
        image: jobMarketData.image,
        accountName: jobMarketData.accountName,
        phoneNumber: jobMarketData.phoneNumber,
      };

      const response = await postInformation(jobMarketInformation);

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

  // const uploadFile = async () => {
  //   const uploadImageFile = inputImageFile.current.files[0];
  //   const uploadFileName =
  //     userID + "_" + localDate + "_" + localTime + "_" + uploadImageFile.name;
  //   jobMarketData.image = uploadFileName;

  //   const s3Client = new S3Client({
  //     region: import.meta.env.VITE_APP_S3_REGION,
  //     credentials: {
  //       accessKeyId: import.meta.env.VITE_APP_S3_ACCESS_KEY,
  //       secretAccessKey: import.meta.env.VITE_APP_S3_SECRET_ACCESS_KEY,
  //     },
  //   });

  //   const S3Params = {
  //     Bucket: import.meta.env.VITE_APP_S3_BUCKET_NAME,
  //     Key: uploadFileName,
  //     Body: uploadImageFile,
  //   };

  //   try {
  //     const result = await s3Client.send(new PutObjectCommand(S3Params));
  //     uploadJobMarketInfo();
  //   } catch (err) {
  //     console.log("Error", err);
  //   }
  // };

  return (
    <>
      <div>
        <form onSubmit={confirmUpload}>
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
          {/* Photo upload function is not included in MVP1
          <label>Photos</label>
          <input
            type="file"
            ref={inputImageFile}
            accept="image/*"
            style={{ width: "61vw", marginBottom: "10px" }}
            onChange={showImage}
          />
          <img src={imageFile} style={{ width: "61vw", marginBottom: "10px" }} />
          */}
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

export default JobMarket;
