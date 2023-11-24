import { useSelector, useDispatch } from "react-redux";

const Home = () => {
  const dispatch = useDispatch();
  let pageStatus = useSelector((state) => state.pageStatus);
  const signInState = useSelector((state) => state.isSignIn);

  const movePostScreen = () => {
    if (signInState) {
      pageStatus = { type: "CHANGE_PAGE_STATE", payload: "PostJobPage" };
    } else {
      pageStatus = { type: "CHANGE_PAGE_STATE", payload: "SignUpPage" };
    }
    dispatch(pageStatus);
  };

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
