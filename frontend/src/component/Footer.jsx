// const Footer = () => {
//   return (
//     <>
//       <div
//         style={{
//           position: "absolute",
//           bottom: 0,
//           background: "blue",
//         }}
//       >
//         footer
//       </div>
//     </>
//   );
// };

// export default Footer;

import { useSelector, useDispatch } from "react-redux";

// const Header = () => {
//   const dispatch = useDispatch();
//   const signInStatus = useSelector((state) => state.isSignIn);

//   const confirmSignOut = () => {
//     const isConfirm = confirm("Are you sure you want to sign out?");
//     if (isConfirm) {
//       signOut();
//     }
//   };

//   const signOut = () => {
//     const storeIsSignIn = { type: "SIGNIN_STATE", payload: false };
//     const storePage = { type: "CHANGE_PAGE_STATE", payload: "HomePage" };
//     dispatch(storeIsSignIn);
//     dispatch(storePage);
//     alert("Sign Out");
//   };

//   const moveHomeScreen = () => {
//     const pageStatus = { type: "CHANGE_PAGE_STATE", payload: "HomePage" };
//     dispatch(pageStatus);
//   };

//   return (
//     <>
//       <div style={{ position: "absolute", top: 0, background: "blue" }}>
//         Header
//         <button onClick={moveHomeScreen}>Home</button>
//         {signInStatus ? (
//           <button onClick={confirmSignOut}>Sign out</button>
//         ) : (
//           <button>Sign In</button>
//         )}
//       </div>
//     </>
//   );
// };

// export default Header;

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";

// export default function Header() {
//   return (
//     <Box sx={{ flexGrow: 5 }}>
//       <AppBar position="static">
//         <Toolbar>
//           <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
//             ヘッダー
//           </Typography>
//         </Toolbar>
//       </AppBar>
//     </Box>
//   );
// }

const Footer = () => {
  const dispatch = useDispatch();

  const moveHomeScreen = () => {
    const pageStatus = { type: "CHANGE_PAGE_STATE", payload: "HomePage" };
    dispatch(pageStatus);
  };

  return (
    <>
      <Box sx={{ flexGrow: 5 }}>
        <AppBar position="static">
          <Toolbar position="static" style={{ backgroundColor: "#631ACF" }}>
            <Grid container alignItems="center" justify="center">
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
                  variant="text"
                  style={{
                    color: "#e0f2f1",
                    backgroundColor: "#631ACF",
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
                  variant="text"
                  style={{
                    color: "#e0f2f1",
                    backgroundColor: "#631ACF",
                  }}
                >
                  Privacy policy
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
                  variant="text"
                  style={{
                    color: "#e0f2f1",
                    backgroundColor: "#631ACF",
                  }}
                >
                  Ⓒ 2023 Job App
                </div>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};

export default Footer;

// <div style={{ position: "absolute", top: 0, background: "blue" }}>
//   Header
// <button onClick={moveHomeScreen}>Home</button>;
// {
//   signInStatus ? (
//     <button onClick={confirmSignOut}>Sign out</button>
//   ) : (
//     <button>Sign In</button>
//   );
// }
// </div>
