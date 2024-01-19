import { useSelector, useDispatch } from "react-redux";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { IoIosRefresh } from "react-icons/io";
import { useTranslation } from "react-i18next";

const Header = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const signInStatus = useSelector((state) => state.isSignIn);
  const headerHeight = "6vh";

  const changeLanguage = (event) => {
    const lng = event.target.value;
    i18n.changeLanguage(lng);
  };

  const confirmSignOut = () => {
    const isConfirm = confirm(t("confirmlogout"));
    if (isConfirm) {
      signOut();
    }
  };

  const signOut = () => {
    const storeIsSignIn = { type: "SIGNIN_STATE", payload: false };
    const storePage = { type: "CHANGE_PAGE_STATE", payload: "HomePage" };
    dispatch(storeIsSignIn);
    dispatch(storePage);
    alert(t("logout"));
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
            <div>
              <select onChange={changeLanguage} value={i18n.language}>
                <option value="en">{t("english")}</option>
                <option value="te">{t("telugu")}</option>
              </select>
            </div>
          </Typography>
          <IoIosRefresh
            onClick={refreshHome}
            style={{ marginRight: "2vw", fontSize: "1.5em", color: "#e0f2f1" }}
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
              {t("logout")}
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
              {t("login")}
            </span>
          )}
        </Toolbar>
      </Box>
    </>
  );
};

export default Header;
