import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
// import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import Box from "@mui/material/Grid";
import Toolbar from "@mui/material/Toolbar";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Modal from "./component/Modal.jsx";
import getUploadInformation from "./clients/getuploadinformation.js";
import homeImage from "./assets/home_img.png";
import jobMarketIcon from "./assets/jobMarketIcon.png";
import careerRelatedNewsIcon from "./assets/careerRelatedNewsIcon.png";
import thandaTalksIcon from "./assets/thandaTalksIcon.png";
import contactBookIcon from "./assets/contactBookIcon.png";
import { useTranslation } from "react-i18next";
import Card from "./Card.jsx";
import "./Home.css";
import Loading from "./Loading.jsx";

const Home = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const signInStatus = useSelector((state) => state.isSignIn);
  const [informationResult, setInformationResult] = useState([]);
  const [visibleItemCount, setVisibleItemCount] = useState(5);
  const [informationTitle, setInformationTitle] = useState("jobMarket");
  const [isLoadingScreen, setIsLoadingScreen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");

  const pushCategoryButton = (categoryType) => {
    setVisibleItemCount(5);
    setInformationTitle(categoryType);
  };

  const movePostScreen = () => {
    const storeNextAction = {
      type: "SET_NEXT_ACTION",
      payload: "PostInformation",
    };
    let storePage = "";
    if (signInStatus) {
      storePage = { type: "CHANGE_PAGE_STATE", payload: "PostPage" };
    } else {
      storePage = { type: "CHANGE_PAGE_STATE", payload: "LogIn" };
    }
    dispatch(storeNextAction);
    dispatch(storePage);
  };

  const fetchAndDisplayInformation = async () => {
    try {
      setIsLoadingScreen(true);
      const uploadInformationResult = await getUploadInformation({
        informationTitle: informationTitle,
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

  const handleOpen = (modalType) => {
    setModalType(modalType);
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  // const fetchS3Data = async () => {
  //   const s3Client = new S3Client({
  //     region: import.meta.env.VITE_APP_S3_REGION,
  //     credentials: {
  //       accessKeyId: import.meta.env.VITE_APP_S3_ACCESS_KEY,
  //       secretAccessKey: import.meta.env.VITE_APP_S3_SECRET_ACCESS_KEY,
  //     },
  //   });

  //   const getObjectParams = {
  //     Bucket: "tomodachijobinformationimage",
  //     Key: "sample.png",
  //   };

  //   try {
  //     const response = await s3Client.send(
  //       new GetObjectCommand(getObjectParams),
  //     );
  //     const arrayBuffer = await new Response(response.Body).arrayBuffer();
  //     const blob = new Blob([arrayBuffer]);
  //     const imageUrl = URL.createObjectURL(blob);
  //     setDataFromS3(imageUrl);
  //   } catch (error) {
  //     console.error("Error in fetching data from S3: ", error);
  //   }
  // };

  useEffect(() => {
    fetchAndDisplayInformation();
    // fetchS3Data();
  }, [informationTitle]);

  return (
    <>
      {isLoadingScreen ? <Loading /> : ""}
      {isModalOpen ? <Modal onClose={handleClose} type={modalType} /> : ""}
      <Box display="flex">
        <div
          style={{
            width: "100vw",
            marginBottom: "0.5em",
            boxShadow: "0em 0.55em 0.1em #631acf",
            borderBottomRightRadius: "0.8em",
            borderBottomLeftRadius: "0.8em",
            backgroundImage: `url(${homeImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            paddingBottom: "2vh",
          }}
        >
          <div
            style={{
              color: "#ffffff",
              fontSize: "180%",
              fontWeight: "bold",
              marginTop: "6vh",
              marginLeft: "5vw",
              marginBottom: "3vh",
              fontFamily: "DM sans-serif",
              lineHeight: "110%",
            }}
          >
            {t("yourHub")} <br></br>
            {t("information")} <br></br>
            {t("exchange")} <br></br>
          </div>
          <div
            style={{
              borderRadius: "10px",
              marginLeft: "3vw",
              marginRight: "3vw",
              background: "linear-gradient(-135deg, #631acf 0%,#2f69f6 85%)",
              display: "flex",
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                width: "100%",
                marginTop: "1vh",
                marginBottom: "1vh",
              }}
            >
              <div
                style={{
                  color: "#ffffff",
                  fontSize: "100%",
                  fontWeight: "bold",
                  marginLeft: "3vw",
                  fontFamily: "DM sans-serif",
                }}
              >
                {t("shareYour")} <br /> {t("info")}
              </div>
              <button
                onClick={movePostScreen}
                style={{
                  fontSize: "90%",
                  backgroundColor: "#ffffff",
                  color: "#631ACF",
                  fontWeight: "bold",
                  marginLeft: "auto",
                  marginRight: "3vw",
                }}
              >
                {t("shareDetails")}
              </button>
            </div>
          </div>
        </div>
      </Box>
      <Box display="flex" style={{ margin: "2vh 2vw" }}>
        {informationTitle == "jobMarket" ? (
          <button
            className={"selectCategoryButton"}
            style={{ borderWidth: "medium" }}
          >
            <img src={jobMarketIcon} className={"selectCategoryButtonImage"} />
            <div className={"selectCategoryButtonText"}>
              {t("job")}
              <br />
              {t("market")}
            </div>
          </button>
        ) : (
          <button
            value="jobMarket"
            onClick={(event) => pushCategoryButton(event.target.value)}
            className={"selectCategoryButton"}
          >
            <img src={jobMarketIcon} className={"selectCategoryButtonImage"} />
            <div className={"selectCategoryButtonText"}>
              {t("job")}
              <br />
              {t("market")}
            </div>
          </button>
        )}
        {informationTitle == "careerRelatedNews" ? (
          <button
            className={"selectCategoryButton"}
            style={{ borderWidth: "medium" }}
          >
            <img
              src={careerRelatedNewsIcon}
              className={"selectCategoryButtonImage"}
            />
            <div className={"selectCategoryButtonText"}>
              {t("career")}
              <br />
              {t("news")}
            </div>
          </button>
        ) : (
          <button
            value="careerRelatedNews"
            onClick={(event) => pushCategoryButton(event.target.value)}
            className={"selectCategoryButton"}
          >
            <img
              src={careerRelatedNewsIcon}
              className={"selectCategoryButtonImage"}
            />
            <div className={"selectCategoryButtonText"}>
              {t("career")}
              <br />
              {t("news")}
            </div>
          </button>
        )}
        {informationTitle == "thandaTalks" ? (
          <button
            className={"selectCategoryButton"}
            style={{ borderWidth: "medium" }}
          >
            <img
              src={thandaTalksIcon}
              className={"selectCategoryButtonImage"}
            />
            <div className={"selectCategoryButtonText"}>
              {t("thanda")}
              <br />
              {t("talks")}
            </div>
          </button>
        ) : (
          <button
            value="thandaTalks"
            onClick={(event) => pushCategoryButton(event.target.value)}
            className={"selectCategoryButton"}
          >
            <img
              src={thandaTalksIcon}
              className={"selectCategoryButtonImage"}
            />
            <div className={"selectCategoryButtonText"}>
              {t("thanda")}
              <br />
              {t("talks")}
            </div>
          </button>
        )}
        {informationTitle == "contactBook" ? (
          <button
            className={"selectCategoryButton"}
            style={{ borderWidth: "medium" }}
          >
            <img
              src={contactBookIcon}
              className={"selectCategoryButtonImage"}
            />
            <div className={"selectCategoryButtonText"}>
              {t("contact")}
              <br />
              {t("book")}
            </div>
          </button>
        ) : (
          <button
            value="contactBook"
            onClick={(event) => pushCategoryButton(event.target.value)}
            className={"selectCategoryButton"}
          >
            <img
              src={contactBookIcon}
              className={"selectCategoryButtonImage"}
            />
            <div className={"selectCategoryButtonText"}>
              {t("contact")}
              <br />
              {t("book")}
            </div>
          </button>
        )}
      </Box>
      <div
        style={{
          marginTop: "2vh",
          marginBottom: "2vh",
          fontWeight: "bold",
          fontSize: "1.1em",
          marginLeft: "5vw",
        }}
      >
        {t("recentPost")}
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
              style={{ display: "block", margin: "auto" }}
            >
              {t("showMore")}
            </button>
          )}
        </div>
      </Box>
      <Box>
        <Toolbar
          position="static"
          style={{
            backgroundColor: "#631ACF",
            height: "6vh",
            minHeight: "0",
          }}
        >
          <Grid container>
            <Grid
              item
              variant="h6"
              component="div"
              xs={4}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Typography style={{ fontSize: "3vw", color: "#e0f2f1" }}>
                <span
                  onClick={() => handleOpen("privacy")}
                  style={{
                    color: "#e0f2f1",
                  }}
                >
                  {t("privacyPolicy")}
                </span>
              </Typography>
            </Grid>
            <Grid
              item
              variant="h6"
              component="div"
              xs={4}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Typography style={{ fontSize: "3vw", color: "#e0f2f1" }}>
                <span
                  onClick={() => handleOpen("howTo")}
                  style={{
                    color: "#e0f2f1",
                  }}
                >
                  {t("howToUse")}
                </span>
              </Typography>
            </Grid>
            <Grid
              item
              variant="h6"
              xs={4}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Typography style={{ fontSize: "2vw", color: "#e0f2f1" }}>
                {t("copyright")}
              </Typography>
            </Grid>
          </Grid>
        </Toolbar>
      </Box>
    </>
  );
};

export default Home;
