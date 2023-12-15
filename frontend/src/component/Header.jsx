import { useSelector, useDispatch } from "react-redux";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

const Header = () => {
  const dispatch = useDispatch();
  const signInStatus = useSelector((state) => state.isSignIn);
  const headerHeight = "8vh";

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

  const moveLogInScreen = () => {
    const storeNextAction = {
      type: "SET_NEXT_ACTION",
      payload: "ViewInformation",
    };
    const storePage = { type: "CHANGE_PAGE_STATE", payload: "LogIn" };
    dispatch(storeNextAction);
    dispatch(storePage);
  };

  return (
    <>
      <Box height={headerHeight}>
        <AppBar>
          <Toolbar position="static" style={{ backgroundColor: "#631ACF" }}>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Logo
            </Typography>
            {signInStatus ? (
              <button
                onClick={confirmSignOut}
                variant="outline"
                style={{
                  color: "#e0f2f1",
                  backgroundColor: "#631ACF",
                  border: "1px solid",
                }}
              >
                Log Out
              </button>
            ) : (
              <button
                variant="outline"
                style={{
                  color: "#e0f2f1",
                  backgroundColor: "#631ACF",
                  border: "1px solid",
                }}
                onClick={moveLogInScreen}
              >
                Log In
              </button>
            )}
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};

export default Header;
