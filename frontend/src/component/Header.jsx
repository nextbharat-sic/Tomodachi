import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Drawer from "@mui/material/Drawer";
import { IconContext } from "react-icons";
import { IoIosRefresh } from "react-icons/io";
import { GoHome } from "react-icons/go";
import { IoDocumentTextOutline } from "react-icons/io5";
import { CiLogin } from "react-icons/ci";
import { CiLogout } from "react-icons/ci";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useTranslation } from "react-i18next";
import "./Header.css";

const Header = () => {
  const { t, i18n } = useTranslation();
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
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
    localStorage.removeItem("accountName");
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
          <MenuIcon
            onClick={() => setIsHamburgerOpen(true)}
            style={{
              color: "#ffffff",
            }}
          />
          <Drawer
            anchor={"right"}
            open={isHamburgerOpen}
            onClose={() => setIsHamburgerOpen(false)}
            PaperProps={{ style: { height: "90%", width: "70%" } }}
          >
            <div className={"hamburgerListHeader"}>
              <div
                className={"hamburgerListText"}
                style={{
                  color: "#2f69f6",
                }}
              >
                Tomodachi
              </div>
              <CloseIcon
                onClick={() => setIsHamburgerOpen(false)}
                className={"closeIcon"}
                style={{ height: "8vh", width: "8vh" }}
              />
            </div>
            <IconContext.Provider value={{ color: "#2f69f6", size: "5vh" }}>
              <div className={"hamburgerListComponent"}>
                <div className={"hamburgerListText"}>Home</div>
                <div className={"hamburgerListIconStorage"}>
                  <GoHome className={"hamburgerListIcon"} />
                </div>
              </div>
              <div className={"hamburgerListComponent"}>
                <div className={"hamburgerListText"}>My Posts</div>
                <div className={"hamburgerListIconStorage"}>
                  <IoDocumentTextOutline />
                </div>
              </div>
              <div className={"hamburgerListComponent"}>
                <div className={"hamburgerListText"}>Log In</div>{" "}
                <div className={"hamburgerListIconStorage"}>
                  <CiLogin />
                </div>
              </div>
            </IconContext.Provider>
          </Drawer>
        </Toolbar>
      </Box>
    </>
  );
};

export default Header;
