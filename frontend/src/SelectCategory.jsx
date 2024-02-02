import { useState } from "react";
import { useDispatch } from "react-redux";
import Box from "@mui/material/Grid";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import JobMarket from "./JobMarket.jsx";
import CareerRelatedNews from "./CareerRelatedNews.jsx";
import ThandaTalks from "./ThandaTalks.jsx";
import ContactBook from "./ContactBook.jsx";
import { useTranslation } from "react-i18next";

const SelectCategory = () => {
  const { t } = useTranslation();
  const [category, setCategory] = useState("");
  const dispatch = useDispatch();

  const categoryDataChange = (event) => {
    const value = event.target.value;
    setCategory(value);
  };

  const backPage = () => {
    const storePage = { type: "CHANGE_PAGE_STATE", payload: "HomePage" };
    dispatch(storePage);
  };

  return (
    <>
      <div
        style={{
          display: "flex",
        }}
      >
        <ArrowBackIcon
          onClick={backPage}
          style={{
            marginTop: "auto",
            marginBottom: "auto",
            marginLeft: "2vw",
            width: "10vw",
          }}
        />
        <h2 style={{ marginLeft: "auto", marginRight: "auto" }}>
          {t("informationDetails")}
        </h2>
        <div
          style={{
            marginRight: "2vw",
            width: "10vw",
          }}
        />
      </div>
      <div>
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
            <option value="contactBook">{t("contactBook")}</option>
          </select>
        </Box>
        {category == "jobMarket" ? <JobMarket /> : ""}
        {category == "careerRelatedNews" ? <CareerRelatedNews /> : ""}
        {category == "thandaTalks" ? <ThandaTalks /> : ""}
        {category == "contactBook" ? <ContactBook /> : ""}
      </div>
    </>
  );
};

export default SelectCategory;
