import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { S3 } from "aws-sdk";
import getUploadInformation from "./clients/getuploadinformation.js";

const Home = () => {
  const dispatch = useDispatch();
  const signInStatus = useSelector((state) => state.isSignIn);
  const [getInformationResult, setGetInformationResult] = useState([]);
  const [visibleItemCount, setVisibleItemCount] = useState(5);

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
      <div key={index}>
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
      const informationResult = await getUploadInformation();
      setGetInformationResult(informationResult);
    } catch (error) {
      console.error("Error fetching upload information:", error);
    }
  };

  const handleShowMore = () => {
    setVisibleItemCount((prevCount) => prevCount + 5);
  };

  useEffect(() => {
    fetchAndDisplayJobInformation();
  }, []);
  const [dataFromS3, setDataFromS3] = useState(null);

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
      // const data = await s3.getObject(params).promise();
      console.log(data);
      setDataFromS3(data);
    } catch (error) {
      console.error("Error in fetching data from S3: ", error);
    }
  };

  useEffect(() => {
    fetchS3Data();
  }, []);

  return (
    <>
      <div style={{ border: "1px solid #333", margin: 3 }}>
        Find your job Here! area
      </div>
      <div style={{ border: "1px solid #333", margin: 3 }}>
        <div>Share career information</div>
        <button onClick={movePostScreen}>Share details</button>
      </div>
      <p>recent post</p>
      <div style={{ border: "1px solid #333", margin: 3 }}>
        <div>Posted information area</div>

        {/* Call displayJobInformationList directly in the JSX */}
        {getInformationResult.length > 0 &&
          displayJobInformationList(getInformationResult)}

        {/* Show more button */}
        {getInformationResult.length > visibleItemCount && (
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
    </>
  );
};

export default Home;
