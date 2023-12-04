import { useSelector, useDispatch } from "react-redux";

const Header = () => {
  const dispatch = useDispatch();
  const signInStatus = useSelector((state) => state.isSignIn);

  const confirmSignOut = () => {
    const isConfirm = confirm("Are you sure you want to sign out?");
    if (isConfirm) {
      signOut();
    }
  };

  const signOut = () => {
    const storeIsSignIn = { type: "SIGNIN_STATE", payload: false };
    const storePage = { type: "CHANGE_PAGE_STATE", payload: "HomePage" };
    dispatch(storeIsSignIn);
    dispatch(storePage);
    alert("Sign Out");
  };

  const moveHomeScreen = () => {
    const pageStatus = { type: "CHANGE_PAGE_STATE", payload: "HomePage" };
    dispatch(pageStatus);
  };

  return (
    <>
      <div style={{ position: "absolute", top: 0, background: "blue" }}>
        Header
        <button onClick={moveHomeScreen}>Home</button>
        {signInStatus ? (
          <button onClick={confirmSignOut}>Sign out</button>
        ) : (
          <button>Sign In</button>
        )}
      </div>
    </>
  );
};

export default Header;
