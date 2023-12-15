import { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import postJobInformation from "./clients/postjobinformation.js";
import Box from "@mui/material/Grid";

const PostJobInformation = () => {
  // const [imageFile, setImageFile] = useState();
  const userID = useSelector((state) => state.userID);
  const accountName = useSelector((state) => state.accountName);
  const phoneNumber = useSelector((state) => state.phoneNumber);
  // const inputImageFile = useRef();
  const dispatch = useDispatch();
  let date = new Date();
  let localDate =
    date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
  // let localTime = date.toLocaleTimeString();

  const [jobData, setJobData] = useState({
    userId: userID,
    informationTitle: "jobRelated",
    jobTitle: "",
    deadlineDate: "",
    modeOfJob: "indoor",
    jobDescription: "",
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
  //   setJobData({
  //     ...jobData,
  //     image: event.target.files[0],
  //   });
  // };

  const handleInputDataChange = (event) => {
    const { name, value } = event.target;
    setJobData({
      ...jobData,
      [name]: value,
    });
  };

  const confirmUpload = (event) => {
    event.preventDefault();
    const deadlineValidation = checkDeadlineDate();
    if (!deadlineValidation) {
      alert("Deadline date has passed");
    } else {
      const isConfirm = confirm("Are you sure you want to upload?");
      if (isConfirm) {
        uploadJobInfo();
        // checkImageFile();
      }
    }
  };

  // const checkImageFile = () => {
  //   const File = inputImageFile.current.files[0];
  //   if (File && File.size > 0) {
  //     uploadFile();
  //   } else {
  //     uploadJobInfo();
  //   }
  // };

  const checkDeadlineDate = () => {
    if (jobData.deadlineDate >= localDate) {
      return true;
    }
    return false;
  };

  const uploadJobInfo = async () => {
    try {
      const jobInformation = {
        userId: jobData.userId,
        informationTitle: jobData.informationTitle,
        jobTitle: jobData.jobTitle,
        deadlineDate: jobData.deadlineDate,
        modeOfJob: jobData.modeOfJob,
        jobDescription: jobData.jobDescription,
        image: jobData.image,
        accountName: jobData.accountName,
        phoneNumber: jobData.phoneNumber,
      };

      const response = await postJobInformation(jobInformation);
      if (response.status === "Success") {
        homePageStatus();
        alert("Upload information is completed!");
      } else {
        alert("Upload information is failed!");
      }
    } catch (error) {
      console.error("Error uploading information:", error);
    }
  };

  // const uploadFile = async () => {
  //   const uploadImageFile = inputImageFile.current.files[0];
  //   const uploadFileName =
  //     userID + "_" + localDate + "_" + localTime + "_" + uploadImageFile.name;
  //   jobData.image = uploadFileName;

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
  //     uploadJobInfo();
  //   } catch (err) {
  //     console.log("Error", err);
  //   }
  // };

  return (
    <>
      <div>
        <form onSubmit={confirmUpload}>
          <h2 style={{ textAlign: "center" }}>Information Details</h2>

          <div style={{ textAlign: "left", paddingLeft: "3vw" }}>
            <label>Information Title</label>
          </div>
          <Box display="flex" justifyContent="center" alignItems="center">
            <select
              name="informationTitle"
              value={jobData.informationTitle}
              onChange={handleInputDataChange}
              style={{
                width: "86vw",
                margin: "10px",
                height: "5vh",
                borderRadius: "10px",
              }}
            >
              <option value="jobRelated">Job Related</option>
            </select>
          </Box>

          <div style={{ textAlign: "left", paddingLeft: "3vw" }}>
            <label>Job Title</label>
          </div>
          <Box display="flex" justifyContent="center" alignItems="center">
            <input
              type="text"
              name="jobTitle"
              placeholder="Write job title"
              value={jobData.jobTitle}
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
            <label>Deadline Date</label>
          </div>
          <Box display="flex" justifyContent="center" alignItems="center">
            <input
              type="date"
              name="deadlineDate"
              value={jobData.deadlineDate}
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
            <label>Mode of Job</label>
          </div>
          <Box display="flex" justifyContent="center" alignItems="center">
            <select
              name="modeOfJob"
              value={jobData.modeOfJob}
              onChange={handleInputDataChange}
              style={{
                width: "86vw",
                margin: "10px",
                height: "5vh",
                borderRadius: "10px",
              }}
            >
              <option value="indoor">Indoor Work</option>
              <option value="outdoor">Outdoor Work</option>
            </select>
          </Box>

          <div style={{ textAlign: "left", paddingLeft: "3vw" }}>
            <label>Job Description</label>
          </div>
          <Box display="flex" justifyContent="center" alignItems="center">
            <textarea
              rows="4"
              name="jobDescription"
              placeholder="Write description of the job"
              value={jobData.jobDescription}
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
              style={{
                backgroundColor: "#2F69F6",
                color: "#e0f2f1",
              }}
            >
              Upload
            </button>
          </Box>
        </form>
      </div>
    </>
  );
};

export default PostJobInformation;
