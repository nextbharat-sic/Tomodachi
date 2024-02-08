import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Drawer from "@mui/material/Drawer";
import { IconContext } from "react-icons";
//import { GoHome } from "react-icons/go";
import { IoDocumentTextOutline } from "react-icons/io5";
import { CiLogin } from "react-icons/ci";
import { CiLogout } from "react-icons/ci";
import { IoIosHelpCircleOutline } from "react-icons/io";
import { MdOutlinePrivacyTip } from "react-icons/md";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useTranslation } from "react-i18next";
import "./HamburgerMenu.css";
import Modal from "./Modal.jsx";

const HamburgerMenu = () => {
  const { t } = useTranslation();
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
  const dispatch = useDispatch();
  const signInStatus = useSelector((state) => state.isSignIn);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");

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
    setIsHamburgerOpen(false);
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

  const moveMyPostsScreen = () => {
    const storeNextAction = {
      type: "SET_NEXT_ACTION",
      payload: "CheckMyPosts",
    };
    let storePage = "";
    if (signInStatus) {
      storePage = { type: "CHANGE_PAGE_STATE", payload: "MyPostPage" };
    } else {
      storePage = { type: "CHANGE_PAGE_STATE", payload: "LogIn" };
    }
    dispatch(storeNextAction);
    dispatch(storePage);
  };


 const handleOpen = (modalType) => {
    setModalType(modalType);
    setIsHamburgerOpen(false);
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  return (
    <>
    {isModalOpen ? <Modal onClose={handleClose} type={modalType} /> : ""}
      <MenuIcon
        onClick={() => setIsHamburgerOpen(true)}
        style={{
          color: "#ffffff",
          fontSize: "4vh",
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
        {/*Home menu*/}
          {/*  <div className={"hamburgerListComponent"}>
                <div className={"hamburgerListText"}>Home</div>
                <div className={"hamburgerListIconStorage"}>
                  <GoHome className={"hamburgerListIcon"} />
                </div>
              </div> */}
        {/*My Posts menu*/}
          <div className={"hamburgerListComponent"} onClick={moveMyPostsScreen}>
            <div className={"hamburgerListText"}>{t("myPosts")}</div>
            <div className={"hamburgerListIconStorage"}>
              <IoDocumentTextOutline />
            </div>
          </div>
        {/*How To Use menu*/}
          <div className={"hamburgerListComponent"} onClick={() => handleOpen("howTo")}>
            <div className={"hamburgerListText"}>{t("howToUse")}</div>
            <div className={"hamburgerListIconStorage"}>
              <IoIosHelpCircleOutline />
            </div>
          </div>
        {/*Privacy Policy menu*/}
          <div className={"hamburgerListComponent"} onClick={() => handleOpen("privacy")}>
            <div className={"hamburgerListText"}>{t("privacyPolicy")}</div>
            <div className={"hamburgerListIconStorage"}>
              <MdOutlinePrivacyTip />
            </div>
          </div>
        {/*LogIN/LogOut menu*/}
          {signInStatus ? (
            <div className={"hamburgerListComponent"} onClick={confirmSignOut}>
              <div className={"hamburgerListText"}>{t("logOut")}</div>
              <div className={"hamburgerListIconStorage"}>
                <CiLogout />
              </div>
            </div>
          ) : (
            <div className={"hamburgerListComponent"} onClick={moveLogInScreen}>
              <div className={"hamburgerListText"}>{t("logIn")}</div>
              <div className={"hamburgerListIconStorage"}>
                <CiLogin />
              </div>
            </div>
          )}
        </IconContext.Provider>
      </Drawer>
    </>
  );
};

export default HamburgerMenu;
