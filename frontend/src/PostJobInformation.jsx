import { useState } from "react";
import { useDispatch } from "react-redux";
import postJobInformation from "./clients/postjobinformation.js";

const PostJobInformation = () => {
  const [imageFile, setImageFile] = useState();
  const [jobData, setJobData] = useState({
    userId: "U123456",
    informationTitle: "jobRelated",
    jobTitle: "",
    deadlineDate: "",
    modeOfJob: "indoor",
    jobDescription: "",
    image: null,
  });
  const dispatch = useDispatch();

  const pageStatus = () => {
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

  const confirmUpload = () => {
    const isConfirm = confirm("Are you sure you want to upload?");
    if (isConfirm) {
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
      };

      const response = await postJobInformation(jobInformation);
      if (response.status === "Success") {
        alert("Upload information is completed!");
        pageStatus();
      } else {
        alert("Upload information is failed!");
      }
    } catch (error) {
      console.error("Error uploading information:", error);
    }
  };

  return (
    <div style={{ maxWidth: "75vw", margin: "auto" }}>
      <h2 style={{ textAlign: "center" }}>Information Details</h2>
      <div>
        <label>Information Title</label>
        <select
          name="informationTitle"
          value={jobData.informationTitle}
          onChange={handleInputDataChange}
          style={{ width: "61.5vw", marginBottom: "10px" }}
        >
          <option value="jobRelated">Job Related</option>
        </select>
      </div>
      <div>
        <label>Job Title</label>
        <input
          type="text"
          name="jobTitle"
          value={jobData.jobTitle}
          onChange={handleInputDataChange}
          style={{ width: "61vw", marginBottom: "10px" }}
          required
        />
      </div>
      <div>
        <label>Deadline Date</label>
        <input
          type="date"
          name="deadlineDate"
          value={jobData.deadlineDate}
          onChange={handleInputDataChange}
          style={{ width: "61vw", marginBottom: "10px" }}
          required
        />
      </div>
      <div>
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
      </div>
      <div>
        <label>Job Description</label>
        <textarea
          rows="4"
          name="jobDescription"
          value={jobData.jobDescription}
          onChange={handleInputDataChange}
          style={{ width: "61vw", marginBottom: "10px" }}
          required
        ></textarea>
      </div>
      <div>
        <label>Photos</label>
        <input
          type="file"
          accept="image/*"
          style={{ width: "61vw", marginBottom: "10px" }}
          onChange={showImage}
        />
        <img src={imageFile} style={{ width: "61vw", marginBottom: "10px" }} />
      </div>
      <button
        onClick={confirmUpload}
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
    </div>
  );
};

export default PostJobInformation;
