import { useState } from "react";
import JobMarket from "./JobMarket.jsx";
import CareerRelatedNews from "./CareerRelatedNews.jsx";
import ThandaTalks from "./ThandaTalks.jsx";
import Box from "@mui/material/Grid";
import { useTranslation } from "react-i18next";

const SelectCategory = () => {
  const { t } = useTranslation();
  const [category, setCategory] = useState("");

  const categoryDataChange = (event) => {
    const value = event.target.value;
    setCategory(value);
  };

  return (
    <>
      <div>
        <h2 style={{ textAlign: "center" }}>{t("informationDetails")}</h2>

        <div style={{ textAlign: "left", paddingLeft: "3vw" }}>
          <label>{t("category")}</label>
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
            <option value="">{t("selectCategory")}</option>
            <option value="jobMarket">{t("jobMarket")}</option>
            <option value="careerRelatedNews">{t("careerRelatedNews")}</option>
            <option value="thandaTalks">{t("thandaTalks")}</option>
          </select>
        </Box>
        {category == "jobMarket" ? <JobMarket /> : ""}
        {category == "careerRelatedNews" ? <CareerRelatedNews /> : ""}
        {category == "thandaTalks" ? <ThandaTalks /> : ""}
      </div>
    </>
  );
};

export default SelectCategory;
