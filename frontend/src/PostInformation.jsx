import { useState } from "react";

const PostJob = () => {
  const [imageFile, setImageFile] = useState();

  const showPhoto = (event) => {
    setImageFile(URL.createObjectURL(event.target.files[0]));
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
        <select style={{ width: "61.5vw", marginBottom: "10px" }}>
          <option value="jobRelated">Job Related</option>
        </select>
        <label htmlFor="jobTitle">Job Title</label>
        <input
          type="text"
          style={{ width: "61vw", marginBottom: "10px" }}
          required
        />
        <label htmlFor="EndingDate">Ending Date</label>
        <input
          type="date"
          style={{ width: "61vw", marginBottom: "10px" }}
          required
        />
        <label htmlFor="modeOfJob">Mode of Job</label>
        <select style={{ width: "61.5vw", marginBottom: "10px" }}>
          <option value="indoor">Indoor Work</option>
          <option value="outdoor">Outdoor Work</option>
        </select>
        <label htmlFor="jobDescription">Job Description</label>
        <textarea
          rows="4"
          style={{ width: "61vw", marginBottom: "10px" }}
          required
        ></textarea>
        <label htmlFor="picture">Photos</label>

        <input
          type="file"
          accept="image/*"
          style={{ width: "61vw", marginBottom: "10px" }}
          onChange={showPhoto}
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

export default PostJob;
