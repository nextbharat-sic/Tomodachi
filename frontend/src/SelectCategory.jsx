import { useState, useRef } from "react";
import { useSelector } from "react-redux";
import JobMarket from "./JobMarket.jsx";
import Box from "@mui/material/Grid";

const SelectCategory = () => {
  const [category, setCategory] = useState("");

  const categoryDataChange = (event) => {
    const value = event.target.value;
    setCategory(value);
  };

  return (
    <>
      <div>
        <h2 style={{ textAlign: "center" }}>Information Details</h2>

        <div style={{ textAlign: "left", paddingLeft: "3vw" }}>
          <label>Category</label>
        </div>
        <Box display="flex" justifyContent="center" alignItems="center">
          <select
            name="category"
            value={category}
            onChange={categoryDataChange}
            style={{
              width: "86vw",
              margin: "10px",
              height: "5vh",
              borderRadius: "10px",
            }}
          >
            <option value="">select category</option>
            <option value="jobRelated">Job Related</option>
            <option value="careerRelatedNews">Career Related News</option>
            <option value="ThandaTalks">Thanda Talks</option>
          </select>
        </Box>
        {category == "jobRelated" ? <JobMarket /> : ""}
      </div>
    </>
  );
};

export default SelectCategory;
