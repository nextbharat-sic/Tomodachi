import { useDispatch } from "react-redux";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Grid from "@mui/material/Grid";

const Footer = () => {
  const dispatch = useDispatch();

  const moveHomeScreen = () => {
    const pageStatus = { type: "CHANGE_PAGE_STATE", payload: "HomePage" };
    dispatch(pageStatus);
  };

  return (
    <>
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
              <div
                style={{
                  color: "#e0f2f1",
                }}
              >
                Privacy policy
              </div>
            </Grid>
            <Grid
              item
              variant="h6"
              xs={4}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <div
                style={{
                  color: "#e0f2f1",
                }}
              >
                Ⓒ 2023 Job App
              </div>
            </Grid>
          </Grid>
        </Toolbar>
      </Box>
    </>
  );
};

export default Footer;
