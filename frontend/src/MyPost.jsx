// Copyright © 2025 Suzuki Motor Corporation All Rights Reserved
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Box from "@mui/material/Grid";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useTranslation } from "react-i18next";
import getUserPosts from "./clients/getuserposts.js";
import Card from "./Card.jsx";
import Loading from "./Loading.jsx";

const MyPost = () => {
  const { t } = useTranslation();
  const [informationResult, setInformationResult] = useState([]);
  const [visibleItemCount, setVisibleItemCount] = useState(5);
  const [isLoadingScreen, setIsLoadingScreen] = useState(false);
  const userID = useSelector((state) => state.userID);
  const dispatch = useDispatch();

  const fetchAndDisplayInformation = async () => {
    try {
      setIsLoadingScreen(true);
      const uploadInformationResult = await getUserPosts({
        userID: userID,
      });
      setInformationResult(uploadInformationResult);
      setIsLoadingScreen(false);
    } catch (error) {
      console.error(t("errorFetching"), error);
      setIsLoadingScreen(false);
    }
  };

  const handleShowMore = () => {
    setVisibleItemCount((prevCount) => prevCount + 5);
  };

  const backPage = () => {
    const storePage = { type: "CHANGE_PAGE_STATE", payload: "HomePage" };
    dispatch(storePage);
  };

  useEffect(() => {
    fetchAndDisplayInformation();
    // fetchS3Data();
  }, []);

  return (
    <>
      {isLoadingScreen ? <Loading /> : ""}
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
          {t("myPosts")}
        </h2>
        <div
          style={{
            marginRight: "2vw",
            width: "10vw",
          }}
        />
      </div>
      <Box display="flex" justifyContent="center" alignItems="center">
        <div>
          {/* Call displayInformationList directly in the JSX */}
          {informationResult.length > 0 &&
            informationResult
              .slice(0, visibleItemCount)
              .map((data, index) => (
                <Card key={index} informationList={data} />
              ))}

          {/* Show more button */}
          {informationResult.length > visibleItemCount && (
            <button
              onClick={handleShowMore}
              style={{ display: "block", margin: "auto", marginBottom: "2vh" }}
            >
              {t("showMore")}
            </button>
          )}
        </div>
      </Box>
    </>
  );
};

export default MyPost;
