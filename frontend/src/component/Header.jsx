import { useDispatch } from "react-redux";

const Header = () => {
  const dispatch = useDispatch();
  const moveHomeScreen = () => {
    const pageStatus = { type: "CHANGE_PAGE_STATE", payload: "HomePage" };
    dispatch(pageStatus);
  };

  return (
    <>
      <div style={{ position: "absolute", top: 0, background: "blue" }}>
        Header
        <button onClick={moveHomeScreen}>Home</button>
      </div>
    </>
  );
};

export default Header;
