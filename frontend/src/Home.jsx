import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { S3 } from "aws-sdk";
import getUploadInformation from "./clients/getuploadinformation.js";

const Home = () => {
  const dispatch = useDispatch();
  const signInStatus = useSelector((state) => state.isSignIn);

  const movePostScreen = () => {
    let storePage = "";
    if (signInStatus) {
      storePage = { type: "CHANGE_PAGE_STATE", payload: "PostJobPage" };
    } else {
      storePage = { type: "CHANGE_PAGE_STATE", payload: "SignUpPage" };
    }
    dispatch(storePage);
  };

  const openHomeScreen = async () => {
    const getInformationResult = await getUploadInformation();
    console.log(getInformationResult);
  };

  openHomeScreen();

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
        <button>Show more</button>
      </div>
      <div>
        {dataFromS3 ? (
          <img src={dataFromS3} alt="S3から取得した画像" />
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </>
  );
};

export default Home;
