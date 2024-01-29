import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
// import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import Box from "@mui/material/Grid";
import getUploadInformation from "./clients/getuploadinformation.js";
import homeImage from "./assets/home_img.png";
import { useTranslation } from "react-i18next";
import Card from "./Card.jsx";

const Home = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const signInStatus = useSelector((state) => state.isSignIn);
  const [informationResult, setInformationResult] = useState([]);
  const [visibleItemCount, setVisibleItemCount] = useState(5);

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
      const uploadInformationResult = await getUploadInformation();
      setInformationResult(uploadInformationResult);
    } catch (error) {
      console.error(t("errorFetching"), error);
    }
  };

  const handleShowMore = () => {
    setVisibleItemCount((prevCount) => prevCount + 5);
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
  }, []);

  return (
    <>
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
    </>
  );
};

export default Home;
