import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import getUploadInformation from "./clients/getuploadinformation.js";

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
    const s3Client = new S3Client({
      region: import.meta.env.VITE_APP_S3_REGION,
      credentials: {
        accessKeyId: import.meta.env.VITE_APP_S3_ACCESS_KEY,
        secretAccessKey: import.meta.env.VITE_APP_S3_SECRET_ACCESS_KEY,
      },
    });

    const getObjectParams = {
      Bucket: "tomodachijobinformationimage",
      Key: "sample.png",
    };

    try {
      const response = await s3Client.send(
        new GetObjectCommand(getObjectParams),
      );
      const arrayBuffer = await new Response(response.Body).arrayBuffer();
      const blob = new Blob([arrayBuffer]);
      const imageUrl = URL.createObjectURL(blob);
      setDataFromS3(imageUrl);
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
    </>
  );
};

export default Home;
