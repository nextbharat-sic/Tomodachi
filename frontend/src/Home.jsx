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
          marginBottom: "1em",
          // margin: "1.5em",
          // height: "30vh",
          borderRadius: "10px",
          boxShadow:
            "0.2em 0.2em 0em rgba(0, 0, 0, 0.1),-0.05em -0.2em 0.2em rgba(0, 0, 0, 0.1)",
          backgroundColor: "#ffffff",
          color: "#000000",
        }}
      >
        <div style={{ position: "relative", width: "85vw", margin: "1em" }}>
          <div
            style={{
              position: "relative",
              top: "0.5em",
              margin: "0.5em",
              fontSize: "0.8em",
              overflowWrap: "break-word",
            }}
          >
            Account Name
          </div>
          <div style={{ position: "relative", overflowWrap: "break-word" }}>
            {jobData.PJT}
          </div>
          <div>
            <span
              style={{
                backgroundColor: "#f5f5f5",
                fontSize: "0.8em",
                border: "0.2em solid #f5f5f5",
                borderRadius: "0.5em",
                paddingRight: "0.3em",
                paddingLeft: "0.3em",
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
            }}
          >
            {jobData.PJD}
          </div>
          <div>
            {dataFromS3 ? (
              <img
                src={dataFromS3}
                alt="S3から取得した画像"
                style={{ width: "10vw", height: "10vh" }}
              />
            ) : (
              <p>Loading...</p>
            )}
          </div>
          <div style={{ fontSize: "0.5em" }}>posted at:{jobData.PCT}</div>
          {/* Add more details as needed */}
        </div>
      </div>
    ));
  };

  const fetchAndDisplayJobInformation = async () => {
    try {
      const uploadInformationResult = await getUploadInformation();
      console.log(uploadInformationResult);
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
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        style={{ marginTop: "3.5em" }}
      >
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
              color: "#ffffff",
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
          margin: "0.5em",
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
              color: "#ffffff",
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
      <div
        style={{
          color: "#000000",
          fontWeight: "bold",
          fontSize: "1.2em",
          marginLeft: "5vw",
        }}
      >
        Recent post
      </div>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        style={{ marginBottom: "4em" }}
      >
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
