import { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import postJobInformation from "./clients/postjobinformation.js";

const PostJobInformation = () => {
  const [imageFile, setImageFile] = useState();
  const userID = useSelector((state) => state.userID);
  const accountName = useSelector((state) => state.accountName);
  const phoneNumber = useSelector((state) => state.phoneNumber);
  const inputImageFile = useRef();
  const dispatch = useDispatch();
  let date = new Date();
  let jpDate = date.toLocaleString("ja-JP", { timeZone: "Asia/Tokyo" });
  let localDate = jpDate.replace(/\//g, "-").split(" ")[0];

  // let localTime = jpDate.replace(/\//g, "-").split(" ")[1];

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

  const showImage = (event) => {
    setImageFile(URL.createObjectURL(event.target.files[0]));
    setJobData({
      ...jobData,
      image: event.target.files[0],
    });
  };

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
        checkImageFile();
      }
    }
  };

  const checkImageFile = () => {
    const File = inputImageFile.current.files[0];
    if (File && File.size > 0) {
      uploadFile();
    } else {
      uploadJobInfo();
    }
  };

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

  const uploadFile = async () => {
    const uploadImageFile = inputImageFile.current.files[0];
    const uploadFileName =
      userID + "_" + localDate + "_" + localTime + "_" + uploadImageFile.name;
    jobData.image = uploadFileName;

    const s3Client = new S3Client({
      region: import.meta.env.VITE_APP_S3_REGION,
      credentials: {
        accessKeyId: import.meta.env.VITE_APP_S3_ACCESS_KEY,
        secretAccessKey: import.meta.env.VITE_APP_S3_SECRET_ACCESS_KEY,
      },
    });

    const S3Params = {
      Bucket: import.meta.env.VITE_APP_S3_BUCKET_NAME,
      Key: uploadFileName,
      Body: uploadImageFile,
    };

    try {
      const result = await s3Client.send(new PutObjectCommand(S3Params));
      uploadJobInfo();
    } catch (err) {
      console.log("Error", err);
    }
  };

  return (
    <div style={{ maxWidth: "75vw", margin: "auto" }}>
      <form
        onSubmit={confirmUpload}
        style={{
          padding: "7vw",
          border: "1px solid #ccc",
          borderRadius: "8px",
        }}
      >
        <h2 style={{ textAlign: "center" }}>Information Details</h2>
        <label>Information Title</label>
        <select
          name="informationTitle"
          value={jobData.informationTitle}
          onChange={handleInputDataChange}
          style={{ width: "61.5vw", marginBottom: "10px" }}
        >
          <option value="jobRelated">Job Related</option>
        </select>
        <label>Job Title</label>
        <input
          type="text"
          name="jobTitle"
          value={jobData.jobTitle}
          onChange={handleInputDataChange}
          style={{ width: "61vw", marginBottom: "10px" }}
          required
        />
        <label>Deadline Date</label>
        <input
          type="date"
          name="deadlineDate"
          value={jobData.deadlineDate}
          onChange={handleInputDataChange}
          style={{ width: "61vw", marginBottom: "10px" }}
          required
        />
        <label>Mode of Job</label>
        <select
          name="modeOfJob"
          value={jobData.modeOfJob}
          onChange={handleInputDataChange}
          style={{ width: "61.5vw", marginBottom: "10px" }}
        >
          <option value="indoor">Indoor Work</option>
          <option value="outdoor">Outdoor Work</option>
        </select>
        <label>Job Description</label>
        <textarea
          rows="4"
          name="jobDescription"
          value={jobData.jobDescription}
          onChange={handleInputDataChange}
          style={{ width: "61vw", marginBottom: "10px" }}
          required
        ></textarea>
        <label>Photo</label>
        <input
          type="file"
          ref={inputImageFile}
          accept="image/*"
          style={{ width: "61vw", marginBottom: "10px" }}
          onChange={showImage}
        />
        <img src={imageFile} style={{ width: "61vw", marginBottom: "10px" }} />
        <button
          type="submit"
          style={{
            backgroundColor: "#2F69F6",
            color: "white",
            padding: "10px 15px",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            width: "30vw",
          }}
        >
          Upload
        </button>
      </form>
    </div>
  );
};

export default PostJobInformation;
