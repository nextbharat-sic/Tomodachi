import { useState } from "react";
import { useDispatch } from "react-redux";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Modal from "./Modal.jsx";

const Footer = () => {
  const dispatch = useDispatch();
  const footerHeight = "8vh";

  const moveHomeScreen = () => {
    const storePage = { type: "CHANGE_PAGE_STATE", payload: "HomePage" };
    dispatch(storePage);
  };
  const [isModalOpen, setModalIsOpen] = useState(false);
  const handleOpen = () => {
    setModalIsOpen(true);
  };

  const handleClose = () => {
    setModalIsOpen(false);
  };
  return (
    <>
      {isModalOpen ? <Modal onClose={handleClose} /> : ""}
      <Box height={footerHeight} position="fixed" bottom="0" width="100%">
      {isModalOpen ? <Modal onClose={handleClose} /> : ""}
      <Box position="fixed" bottom="0" width="100%">
        <Toolbar position="static" style={{ backgroundColor: "#631ACF" }}>
          <Grid container>
            <Grid
              item
              variant="h6"
              component="div"
              xs={4}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <div
                onClick={moveHomeScreen}
                style={{
                  color: "#e0f2f1",
                }}
              >
                Home
              </div>
            </Grid>
            <Grid
              item
              variant="h6"
              component="div"
              xs={4}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Typography style={{ fontSize: "3vw", color: "#e0f2f1" }}>
                <span
                  onClick={handleOpen}
                  style={{
                    color: "#e0f2f1",
                  }}
                >
                  Privacy policy
                </span>
              </Typography>
            </Grid>
            <Grid
              item
              variant="h6"
              xs={4}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Typography style={{ fontSize: "3vw", color: "#e0f2f1" }}>
                Ⓒ 2023 Job App
              </Typography>
            </Grid>
          </Grid>
        </Toolbar>
      </Box>
    </>
  );
};

export default Footer;
