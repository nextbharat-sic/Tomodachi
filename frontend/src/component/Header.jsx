import { useSelector, useDispatch } from "react-redux";
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

  const refreshUserInformation = () => {
    const storeUserID = { type: "SET_USER_ID", payload: "" };
    const storeAccountName = { type: "SET_ACCOUNT_NAME", payload: "" };
    const storePhoneNumber = { type: "SET_PHONE_NUMBER", payload: "" };
    const storePrivacyPolicyCheck = {
      type: "SET_PRIVACY_POLICY_CHECK",
      payload: false,
    };
    dispatch(storeUserID);
    dispatch(storeAccountName);
    dispatch(storePhoneNumber);
    dispatch(storePrivacyPolicyCheck);
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userID");
    localStorage.removeItem("phoneNumber");
    localStorage.removeItem("accoutnName");
  };

  const refreshUserAction = () => {
    const storeNextAction = { type: "SET_NEXT_ACTION", payload: "" };
    const storeClientPage = { type: "SET_CLIENT_PAGE", payload: "" };
    dispatch(storeNextAction);
    dispatch(storeClientPage);
  };

  const confirmSignOut = () => {
    const isConfirm = confirm(t("confirmLogOut"));
    if (isConfirm) {
      logOut();
    }
  };

  const logOut = () => {
    const storeIsSignIn = { type: "SIGNIN_STATE", payload: false };
    const storePage = { type: "CHANGE_PAGE_STATE", payload: "HomePage" };
    dispatch(storeIsSignIn);
    dispatch(storePage);
    refreshUserInformation();
    refreshUserAction();
    alert(t("logOut"));
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
              <select
                onChange={changeLanguage}
                value={i18n.language}
                style={{
                  marginLeft: "4vw",
                  color: "#e0f2f1",
                  backgroundColor: "#631ACF",
                  border: "none",
                  fontSize: "4vw",
                }}
              >
                <option value="en">English</option>
                <option value="te">తెలుగు</option>
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
              {t("logOut")}
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
              {t("logIn")}
            </span>
          )}
        </Toolbar>
      </Box>
    </>
  );
};

export default Header;
