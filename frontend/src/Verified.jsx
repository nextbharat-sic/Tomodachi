import { useDispatch } from "react-redux";
import Box from "@mui/material/Grid";
import TaskAltIcon from "@mui/icons-material/TaskAlt";

const Verified = () => {
  const dispatch = useDispatch();

  const doneVerfied = () => {
    const storePage = { type: "CHANGE_PAGE_STATE", payload: "HomePage" };
    dispatch(storePage);
  };

  return (
    <>
      <div>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          marginTop="10vh"
        >
          <TaskAltIcon sx={{ fontSize: 150 }} style={{ color: "#2F69F6" }} />
        </Box>

        <h2 style={{ textAlign: "center" }}>Verified</h2>

        <div
          style={{
            textAlign: "center",
          }}
        >
          Your account has been verified <br />
          successfully
        </div>
        <Box display="flex" justifyContent="center" alignItems="center">
          <button
            style={{
              marginTop: "15vh",
              backgroundColor: "#2F69F6",
              color: "#e0f2f1",
            }}
            onClick={doneVerfied}
          >
            Done
          </button>
        </Box>
      </div>
    </>
  );
};

export default Verified;
