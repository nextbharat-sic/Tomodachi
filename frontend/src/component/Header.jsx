// Copyright © 2025 Suzuki Motor Corporation All Rights Reserved
import { useDispatch } from "react-redux";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { IoIosRefresh } from "react-icons/io";
import { useTranslation } from "react-i18next";
import HamburgerMenu from "./HamburgerMenu.jsx";

const Header = () => {
  const { i18n } = useTranslation();
  const dispatch = useDispatch();
  const headerHeight = "6vh";

  const changeLanguage = (event) => {
    const lng = event.target.value;
    i18n.changeLanguage(lng);
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
          <HamburgerMenu />
        </Toolbar>
      </Box>
    </>
  );
};

export default Header;
