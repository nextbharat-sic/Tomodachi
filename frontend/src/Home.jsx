import { useSelector, useDispatch } from "react-redux";
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
    </>
  );
};

export default Home;
