// Copyright © 2025 Suzuki Motor Corporation All Rights Reserved
import { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import postInformation from "./clients/postinformation.js";
import Box from "@mui/material/Grid";
import { useTranslation } from "react-i18next";

const ThandaTalks = () => {
  const { t } = useTranslation();
  // const [imageFile, setImageFile] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const userID = useSelector((state) => state.userID);
  const accountName = useSelector((state) => state.accountName);
  const phoneNumber = useSelector((state) => state.phoneNumber);
  // const inputImageFile = useRef();
  const dispatch = useDispatch();
  // let date = new Date();
  // let localTime = date.toLocaleTimeString();

  const [thandaTalksData, setThandaTalksData] = useState({
    userId: userID,
    category: "thandaTalks",
    forWhichThanda: "tunikalaThanda",
    title: "",
    contactNumber: "",
    deadlineDate: "",
    modeOfJob: "",
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
  //   setThandaTalksData({
  //     ...thandaTalksData,
  //     image: event.target.files[0],
  //   });
  // };

  const handleInputDataChange = (event) => {
    const { name, value } = event.target;
    setThandaTalksData({
      ...thandaTalksData,
      [name]: value,
    });
  };

  const confirmUpload = (event) => {
    event.preventDefault();

    const isConfirm = confirm(t("confirmUpload"));
    if (isConfirm) {
      setIsLoading(true);
      uploadThandaTalksInfo();
      // checkImageFile();
    }
  };

  // const checkImageFile = () => {
  //   const File = inputImageFile.current.files[0];
  //   if (File && File.size > 0) {
  //     uploadFile();
  //   } else {
  //     uploadThandaTalksInfo();
  //   }
  // };

  const uploadThandaTalksInfo = async () => {
    try {
      const thandaTalksInformation = {
        userId: thandaTalksData.userId,
        category: thandaTalksData.category,
        forWhichThanda: thandaTalksData.forWhichThanda,
        title: thandaTalksData.title,
        deadlineDate: thandaTalksData.deadlineDate,
        modeOfJob: thandaTalksData.modeOfJob,
        contactNumber: thandaTalksData.contactNumber,
        description: thandaTalksData.description,
        image: thandaTalksData.image,
        accountName: thandaTalksData.accountName,
        phoneNumber: thandaTalksData.phoneNumber,
      };

      const response = await postInformation(thandaTalksInformation);

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
  //   thandaTalksData.image = uploadFileName;

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
  //     uploadThandaTalksInfo();
  //   } catch (err) {
  //     console.log("Error", err);
  //   }
  // };

  return (
    <>
      <div>
        <form onSubmit={confirmUpload}>
          <div style={{ textAlign: "left", paddingLeft: "3vw" }}>
            <label>{t("forWhichThanda")}</label>
          </div>
          <Box display="flex" justifyContent="center" alignItems="center">
            <select
              name="forWhichThanda"
              value={thandaTalksData.forWhichThanda}
              onChange={handleInputDataChange}
              style={{
                width: "86vw",
                margin: "10px",
                height: "5vh",
                borderRadius: "10px",
              }}
            >
              <option value="tunikalaThanda">{t("tunikalaThanda")}</option>
            </select>
          </Box>
          <div style={{ textAlign: "left", paddingLeft: "3vw" }}>
            <label>{t("title")}</label>
          </div>
          <Box display="flex" justifyContent="center" alignItems="center">
            <input
              type="text"
              name="title"
              placeholder={t("writeTitle")}
              value={thandaTalksData.title}
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
              value={thandaTalksData.description}
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

export default ThandaTalks;
