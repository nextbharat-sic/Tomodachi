import { useState } from "react";

const PostJob = () => {
  const [file, setFile] = useState();

  const showPhoto = (e) => {
    setFile(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <div style={{ maxWidth: "75vw", margin: "auto" }}>
      <form
        style={{
          padding: "7vw",
          border: "1px solid #ccc",
          borderRadius: "8px",
        }}
      >
        <h2 style={{ textAlign: "center" }}>Information Details</h2>
        <label htmlFor="infoTitle">Information Title</label>
        <select
          id="infoTitle"
          name="infoTitle"
          style={{ width: "61.5vw", marginBottom: "10px" }}
        >
          <option value="jobRelated">Job Related</option>
        </select>
        <label htmlFor="jobTitle">Job Title</label>
        <input
          type="text"
          id="jobTitle"
          name="jobTitle"
          style={{ width: "61vw", marginBottom: "10px" }}
          required
        />
        <label htmlFor="modeOfJob">Mode of Job</label>
        <select
          id="modeOfJob"
          name="modeOfJob"
          style={{ width: "61.5vw", marginBottom: "10px" }}
        >
          <option value="indoor">Indoor Work</option>
          <option value="outdoor">Outdoor Work</option>
        </select>
        <label htmlFor="jobDescription">Job Description</label>
        <textarea
          id="jobDescription"
          name="jobDescription"
          rows="4"
          style={{ width: "61vw", marginBottom: "10px" }}
          required
        ></textarea>
        <label htmlFor="picture">Photos</label>

        <input
          type="file"
          id="picture"
          name="picture"
          accept="image/*"
          style={{ width: "61vw", marginBottom: "10px" }}
          onChange={showPhoto}
        />
        <img src={file} style={{ width: "61vw", marginBottom: "10px" }} />
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

export default PostJob;
