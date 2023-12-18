import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
// import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import Box from "@mui/material/Grid";
import getUploadInformation from "./clients/getuploadinformation.js";
import ShareCarrerInformationImage from "./assets/ShareCarrerInformationImage.png";

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
      payload: "PostJobInformation",
    };
    let storePage = "";
    if (signInStatus) {
      storePage = { type: "CHANGE_PAGE_STATE", payload: "PostJobPage" };
    } else {
      storePage = { type: "CHANGE_PAGE_STATE", payload: "LogIn" };
    }
    dispatch(storeNextAction);
    dispatch(storePage);
  };

  const checkActive = (pdd) => {
    let date = new Date();
    let localDate =
      date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    if (localDate <= pdd) {
      return true;
    } else {
      return false;
    }
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
              {jobData.PJT}
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
            {jobData.PJD}
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
      <Box display="flex" justifyContent="center" alignItems="center">
        <div
          style={{
            width: "100vw",
            height: "25vh",
            marginBottom: "0.5em",
            boxShadow: "0em 0.55em 0.1em #631acf",
            borderBottomRightRadius: "0.8em",
            borderBottomLeftRadius: "0.8em",
            background: "linear-gradient(135deg, #631acf 0%,#2f69f6 85%)",
          }}
        >
          <p
            style={{
              color: "#ffffff",
              fontSize: "180%",
              fontWeight: "bold",
              marginLeft: "5vw",
              fontFamily: "DM sans-serif",
            }}
          >
            Find your job <br></br>
            <span style={{ fontSize: "150%" }}> here!</span>
          </p>
        </div>
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        style={{
          boxShadow: "0em 0.3em 0em rgba(0, 0, 0, 0.1)",
          borderBottomRightRadius: "0.8em",
          borderBottomLeftRadius: "0.8em",
          margin: "0.5em",
          padding: "2em",
        }}
      >
        <div
          style={{
            width: "100vw",
            margin: "0.8em",
            height: "35vh",
            borderRadius: "10px",
            background: "#2F69F6",
          }}
        >
          <div style={{ display: "flex" }}>
            <div
              style={{
                color: "#ffffff",
                fontSize: "125%",
                fontWeight: "bold",
                marginLeft: "5vw",
                marginTop: "7vh",
                fontFamily: "DM sans-serif",
              }}
            >
              Share career <br /> information
            </div>
            <div>
              <img
                src={ShareCarrerInformationImage}
                style={{ width: "35vw", margin: "5vw" }}
              />
              <button
                onClick={movePostScreen}
                style={{
                  fontSize: "90%",
                  backgroundColor: "#ffffff",
                  color: "#631ACF",
                  fontWeight: "bold",
                  margin: "auto",
                  display: "flex",
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
          fontWeight: "bold",
          fontSize: "1.2em",
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
