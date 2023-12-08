import { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import S3 from "aws-sdk/clients/s3";
import postJobInformation from "./clients/postjobinformation.js";

const PostJobInformation = () => {
  const [imageFile, setImageFile] = useState();
  const userID = useSelector((state) => state.userID);
  let date = new Date();
  let localDate = date.toLocaleDateString().replace(/\//g, "");
  let localTime = date.toLocaleTimeString();
  const inputImageFile = useRef();

  const [jobData, setJobData] = useState({
    userId: userID,
    informationTitle: "jobRelated",
    jobTitle: "",
    deadlineDate: "",
    modeOfJob: "indoor",
    jobDescription: "",
    image: "",
    createTime: localTime,
    createDate: localDate,
  });

  const dispatch = useDispatch();
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
    const isConfirm = confirm("Are you sure you want to upload?");
    if (isConfirm) {
      checkImageFile();
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
        createTime: jobData.createTime,
        createDate: jobData.createDate,
      };

      const response = await postJobInformation(jobInformation);
      if (response.status === "Success") {
        alert("Upload information is completed!");
        homePageStatus();
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

    const s3 = new S3({
      accessKeyId: import.meta.env.VITE_APP_S3_ACCESS_KEY,
      secretAccessKey: import.meta.env.VITE_APP_S3_SECRET_ACCESS_KEY,
      region: import.meta.env.VITE_APP_S3_REGION,
    });
    s3.upload(
      {
        Bucket: import.meta.env.VITE_APP_S3_BUCKET_NAME,
        Key: uploadFileName,
        Body: uploadImageFile,
      },
      (err, data) => {
        if (err) {
          console.log(err);
          alert("Upload information is failed!");
        } else {
          jobData.image = data.Location;
          uploadJobInfo();
        }
      },
    );
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
        <label>Photos</label>
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
