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
          width: "90vw",
          margin: "10px",
          height: "20vh",
          borderRadius: "10px",
          border: "1px solid #333",
          boxShadow: "5px 5px 10px rgba(0, 0, 0, 0.3)",
          background: "linear-gradient(to right, #87CEEB, #87CEEB)",
        }}
      >
        <h2>Job Information</h2>
        <p>PCT: {jobData.PCT}</p>
        <p>PTP: {jobData.PTP}</p>
        <p>PID: {jobData.PID}</p>
        {/* Add more details as needed */}
        <hr />
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
            margin: "10px",
            height: "25vh",
            borderRadius: "10px",
            border: "1px solid #333",
            boxShadow: "5px 5px 10px rgba(0, 0, 0, 0.3)",
            background: "linear-gradient(to right,  #800080, #87CEEB)",
          }}
        >
          <p
            style={{
              fontSize: "150%",
              fontWeight: "bold",
              position: "absolute",
              left: "10%",
              top: "20%",
              margin: "0px",
            }}
          >
            Find your job <br></br> here!
          </p>
        </div>
      </Box>

      <Box display="flex" justifyContent="center" alignItems="center">
        <div
          style={{
            width: "100vw",
            margin: "10px",
            height: "25vh",
            borderRadius: "10px",
            border: "1px solid #333",
            boxShadow: "5px 5px 10px rgba(0, 0, 0, 0.3)",
            background: "linear-gradient(to right, #800080, #87CEEB)",
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
              top: "55%",
              right: "10%",
              margin: 3,
            }}
          >
            <button onClick={movePostScreen}>Share details</button>
          </div>
        </div>
      </Box>
      <p>recent post</p>
      <Box display="flex" justifyContent="" alignItems="">
        <div>
          <div>
            <div>Posted information area</div>

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
                src={dataFromS3}
                alt="S3から取得した画像"
                style={{ width: "10vw", height: "10vh" }}
              />
            ) : (
              <p>Loading...</p>
            )}
          </div>
        </div>
      </Box>
    </>
  );
};

export default Home;
