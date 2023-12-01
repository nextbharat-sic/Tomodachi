import { useDispatch } from "react-redux";

const Header = (props) => {
  const dispatch = useDispatch();
  console.log(props.isSignIn);

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

  return (
    <>
      <div style={{ position: "absolute", top: 0, background: "blue" }}>
        Header
        {props.isSignIn ? (
          <button onClick={confirmSignOut}>Sign out</button>
        ) : (
          <button>Sign In</button>
        )}
      </div>
    </>
  );
};

export default Header;
