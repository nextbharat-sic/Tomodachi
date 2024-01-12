import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect, Fragment } from "react";
// import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import Box from "@mui/material/Grid";
import getUploadInformation from "./clients/getuploadinformation.js";
import homeImage from "./assets/home_img.png";

const Home = () => {
  const dispatch = useDispatch();
  const signInStatus = useSelector((state) => state.isSignIn);
  const [informationResult, setInformationResult] = useState([]);
  const [visibleItemCount, setVisibleItemCount] = useState(5);
  // const [dataFromS3, setDataFromS3] = useState(null);
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const replaceDate = (PCT) => {
    const day = PCT.split("-")[2].split("/")[0];
    const month = PCT.split("-")[1];
    const time = PCT.split("-")[2].split("/")[1];
    return (
      day +
      " " +
      monthNames[Number(month) - 1] +
      ", " +
      time.split(":")[0] +
      ":" +
      time.split(":")[1]
    );
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

  const checkActive = (pdd) => {
    let date = new Date();
    let localDate =
      date.getFullYear() +
      "-" +
      (date.getMonth() + 1).toString().padStart(2, "0") +
      "-" +
      date.getDate().toString().padStart(2, "0");
    if (localDate <= pdd) {
      return true;
    } else {
      return false;
    }
  };

  const renderLinkedText = (text) => {
    const linkRegex = /(?:https?|ftp):\/\/\S+/gi;
    const parts = text.split(linkRegex);
    const linkMatches = text.match(linkRegex);

    if (!linkMatches) {
      return text;
    }

    return parts.map((part, index) => (
      <Fragment key={index}>
        {index > 0 && (
          <a
            href={linkMatches[index - 1]}
            target="_blank"
            rel="noopener noreferrer"
          >
            {linkMatches[index - 1]}
          </a>
        )}
        {part}
      </Fragment>
    ));
  };

  const displayJobInformationList = (dataList) => {
    return dataList.slice(0, visibleItemCount).map((jobData, index) => (
      <div
        key={index}
        style={{
          width: "92vw",
          marginBottom: "1em",
          borderRadius: "10px",
          boxShadow:
            "0.2em 0.2em 0em rgba(0, 0, 0, 0.1),-0.05em -0.2em 0.2em rgba(0, 0, 0, 0.1)",
          backgroundColor: "#ffffff",
          color: "#000000",
        }}
      >
        <div
          style={{
            position: "relative",
            width: "85vw",
            marginLeft: "5vw",
          }}
        >
          <div
            style={{
              overflowWrap: "break-word",
              wordBreak: "break-word",
              display: "flex",
            }}
          >
            <img
              width="48"
              height="48"
              src="https://img.icons8.com/fluency/48/test-account--v1.png"
              alt="test-account--v1"
            />
            <div
              style={{
                fontFamily: "DM sans",
                fontWeight: "Bold",
                marginTop: "1.5vh",
                marginLeft: "3vw",
              }}
            >
              {jobData.PAN}
            </div>
            {checkActive(jobData.PDD) ? (
              <span
                style={{
                  backgroundColor: "#2f69f6",
                  padding: "0.3em 0.5em",
                  color: "#e0f2f1",
                  textAlign: "center",
                  borderRadius: "0.5em",
                  marginTop: "2vh",
                  marginLeft: "auto",
                  minWidth: "45px",
                  maxHeight: "30px",
                }}
              >
                Active
              </span>
            ) : (
              <span
                style={{
                  backgroundColor: "#696969",
                  padding: "0.3em 0.5em",
                  color: "#e0f2f1",
                  textAlign: "center",
                  borderRadius: "0.5em",
                  marginTop: "2vh",
                  marginLeft: "auto",
                  minWidth: "45px",
                  maxHeight: "30px",
                }}
              >
                Close
              </span>
            )}
          </div>
          <div style={{ display: "flex" }}>
            <div
              style={{
                overflowWrap: "break-word",
                maxWidth: "80vw",
                fontFamily: "DM sans-serif",
                fontSize: "120%",
                fontWeight: "Bold",
                marginLeft: "0.5em",
              }}
            >
              {jobData.PTI}
            </div>
          </div>
          <div>
            <span
              style={{
                backgroundColor: "#f5f5f5",
                border: "0.2em solid #f5f5f5",
                borderRadius: "1em",
                paddingRight: "0.3em",
                paddingLeft: "0.3em",
                marginLeft: "2vw",
                fontSize: "0.9em",
              }}
            >
              {jobData.PMJ}
            </span>
          </div>
          <div
            style={{
              position: "relative",
              overflowWrap: "break-word",
              margin: "0.5em",
              whiteSpace: "pre-wrap",
            }}
          >
            {renderLinkedText(jobData.PDE)}
          </div>
          {/* <div>
            {dataFromS3 ? (
              <img
                src={dataFromS3}
                alt="S3から取得した画像"
                style={{ width: "10vw", height: "10vh" }}
              />
            ) : (
              <p>Loading...</p>
            )}
          </div>*/}
          <div
            style={{
              fontSize: "0.8em",
              margin: "0.5em",
              paddingBottom: "10px",
            }}
          >
            posted at: {replaceDate(String(jobData.PCT))}
          </div>
          {/* Add more details as needed */}
        </div>
      </div>
    ));
  };

  const fetchAndDisplayJobInformation = async () => {
    try {
      const uploadInformationResult = await getUploadInformation();
      setInformationResult(uploadInformationResult);
    } catch (error) {
      console.error("Error fetching upload information:", error);
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
    fetchAndDisplayJobInformation();
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
            backgroundPosition: "center center",
            paddingBottom: "2vh",
          }}
        >
          <div
            style={{
              color: "#ffffff",
              fontSize: "180%",
              fontWeight: "bold",
              marginTop: "3vh",
              marginLeft: "2vw",
              marginBottom: "8vh",
              fontFamily: "DM sans-serif",
              lineHeight: "110%",
            }}
          >
            Your Hub for <br></br>
            Information <br></br>
            Exchange <br></br>
          </div>
          <div
            style={{
              borderRadius: "10px",
              marginLeft: "2vw",
              marginRight: "2vw",
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
                Share your <br /> information
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
                Share details
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
        Recent post
      </div>
      <Box display="flex" justifyContent="center" alignItems="center">
        <div>
          {/* Call displayJobInformationList directly in the JSX */}
          {informationResult.length > 0 &&
            displayJobInformationList(informationResult)}

          {/* Show more button */}
          {informationResult.length > visibleItemCount && (
            <button
              onClick={handleShowMore}
              style={{ display: "block", margin: "auto" }}
            >
              Show more
            </button>
          )}
        </div>
      </Box>
    </>
  );
};

export default Home;
