import { useSelector, useDispatch } from "react-redux";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { IoIosRefresh } from "react-icons/io";

const Header = () => {
  const dispatch = useDispatch();
  const signInStatus = useSelector((state) => state.isSignIn);
  const headerHeight = "6vh";

  const confirmSignOut = () => {
    const isConfirm = confirm("Are you sure you want to log out?");
    if (isConfirm) {
      signOut();
    }
  };

  const signOut = () => {
    const storeIsSignIn = { type: "SIGNIN_STATE", payload: false };
    const storePage = { type: "CHANGE_PAGE_STATE", payload: "HomePage" };
    dispatch(storeIsSignIn);
    dispatch(storePage);
    alert("Log Out");
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

  const refreshHome = async () => {
    const storeInitialPage = { type: "CHANGE_PAGE_STATE", payload: "" };
    await dispatch(storeInitialPage);
    const storeHomePage = { type: "CHANGE_PAGE_STATE", payload: "HomePage" };
    dispatch(storeHomePage);
  };

  return (
    <>
      <Box height={headerHeight}>
        <AppBar>
          <Toolbar
            position="static"
            style={{
              backgroundColor: "#631ACF",
              height: headerHeight,
              minHeight: "0",
            }}
          >
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, display: "flex", alignItems: "center" }}
            >
              <div
                style={{
                  height: headerHeight,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <img height="90%" src="/logowhite.png" />
              </div>
              <span style={{ marginLeft: "4px" }}>Tomodachi</span>
            </Typography>
            <IoIosRefresh
              onClick={refreshHome}
              style={{ marginRight: "2vw", fontSize: "2em" }}
            />
            {signInStatus ? (
              <span
                onClick={confirmSignOut}
                variant="outline"
                style={{
                  color: "#e0f2f1",
                  backgroundColor: "#631ACF",
                }}
              >
                Log Out
              </span>
            ) : (
              <span
                variant="outline"
                style={{
                  color: "#e0f2f1",
                  backgroundColor: "#631ACF",
                }}
                onClick={moveLogInScreen}
              >
                Log In
              </span>
            )}
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};

export default Header;
