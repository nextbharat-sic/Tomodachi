import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { S3 } from "aws-sdk";
import getUploadInformation from "./clients/getuploadinformation.js";
import Box from "@mui/material/Grid";

const Home = () => {
  const dispatch = useDispatch();
  const signInStatus = useSelector((state) => state.isSignIn);
  const [informationResult, setInformationResult] = useState([]);
  const [visibleItemCount, setVisibleItemCount] = useState(5);
  const [dataFromS3, setDataFromS3] = useState(null);

  const movePostScreen = () => {
    let storePage = "";
    if (signInStatus) {
      storePage = { type: "CHANGE_PAGE_STATE", payload: "PostJobPage" };
    } else {
      storePage = { type: "CHANGE_PAGE_STATE", payload: "SignUpPage" };
    }
    dispatch(storePage);
  };

  const displayJobInformationList = (dataList) => {
    return dataList.slice(0, visibleItemCount).map((jobData, index) => (
      <div
        key={index}
        style={{
          width: "92vw",
          margin: "1.5em",
          height: "30vh",
          borderRadius: "10px",
          boxShadow:
            "0.2em 0.2em 0em rgba(0, 0, 0, 0.1),-0.05em -0.2em 0.2em rgba(0, 0, 0, 0.1)",
          backgroundColor: "#ffffff",
          color: "#000000",
        }}
      >
        <h2>Job Information</h2>
        <p>PCT: {jobData.PCT}</p>
        <p>PTP: {jobData.PTP}</p>
        <p>PID: {jobData.PID}</p>
        {/* Add more details as needed */}
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

  const fetchS3Data = async () => {
    const s3 = new S3({
      region: import.meta.env.VITE_APP_S3_REGION, // バケットのリージョン
      accessKeyId: import.meta.env.VITE_APP_S3_ACCESS_KEY, // アクセスキー
      secretAccessKey: import.meta.env.VITE_APP_S3_SECRET_ACCESS_KEY, // シークレットアクセスキー
    });

    const params = {
      Bucket: "tomodachijobinformationimage", // バケット名
      Key: "sample.png", // ファイル名（パスも含める）
      Expires: 60, // URL の有効期限（秒）
    };

    try {
      const data = await s3.getSignedUrlPromise("getObject", params);
      console.log(data);
      setDataFromS3(data);
    } catch (error) {
      console.error("Error in fetching data from S3: ", error);
    }
  };

  useEffect(() => {
    fetchAndDisplayJobInformation();
    fetchS3Data();
  }, []);

  return (
    <>
      <Box display="flex" justifyContent="center" alignItems="center">
        <div
          style={{
            width: "100vw",
            height: "25vh",
            marginBottom: "0.5em",
            boxShadow: "0em 0.55em 0.1em rgba(99, 26, 207, 1)",
            borderBottomRightRadius: "0.8em",
            borderBottomLeftRadius: "0.8em",
            background: "linear-gradient(to right,  #631ACF, #87CEEB)",
          }}
        >
          <p
            style={{
              fontSize: "150%",
              fontWeight: "bold",
              position: "absolute",
              left: "10%",
              top: "20%",
              margin: "0%",
            }}
          >
            Find your job <br></br> here!
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
        }}
      >
        <div
          style={{
            width: "100vw",
            margin: "0.8em",
            height: "25vh",
            borderRadius: "10px",
            background: "linear-gradient(to right, #631ACF, #631ACF)",
          }}
        >
          <p
            style={{
              fontSize: "120%",
              fontWeight: "bold",
              position: "absolute",
              left: "10%",
              top: "45%",
              margin: "0px",
            }}
          >
            Share career <br></br> information
          </p>
          <div
            style={{
              position: "absolute",
              top: "52%",
              right: "6%",
              margin: 3,
            }}
          >
            <button
              onClick={movePostScreen}
              style={{
                backgroundColor: "#ffffff",
                color: "#631ACF",
              }}
            >
              Share details
            </button>
          </div>
        </div>
      </Box>
      <p
        style={{
          color: "#000000",
          margin: "1em",
          fontWeight: "bold",
          fontSize: "1.2em",
        }}
      >
        Recent post
      </p>
      <Box display="flex" justifyContent="center" alignItems="center">
        <div>
          {/* Call displayJobInformationList directly in the JSX */}
          {informationResult.length > 0 &&
            displayJobInformationList(informationResult)}

          {/* Show more button */}
          {informationResult.length > visibleItemCount && (
            <button onClick={handleShowMore}>Show more</button>
          )}
        </div>
        <div>
          {dataFromS3 ? (
            <img
            // src={dataFromS3}
            // alt="S3から取得した画像"
            // style={{ width: "10vw", height: "10vh" }}
            />
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </Box>
    </>
  );
};

export default Home;
