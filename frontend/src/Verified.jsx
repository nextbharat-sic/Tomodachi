import { useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Grid";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import { useTranslation } from "react-i18next";

const Verified = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const nextAction = useSelector((state) => state.nextAction);

  const doneVerfied = () => {
    let storePage = "";
    if (nextAction == "PostInformation") {
      storePage = { type: "CHANGE_PAGE_STATE", payload: "PostPage" };
    } else if (nextAction == "CheckMyPosts") {
      storePage = { type: "CHANGE_PAGE_STATE", payload: "MyPostPage" };
    } else {
      storePage = { type: "CHANGE_PAGE_STATE", payload: "HomePage" };
    }
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

        <h2 style={{ textAlign: "center" }}>{t("verified")}</h2>

        <div
          style={{
            textAlign: "center",
          }}
        >
          {t("yourAccountHasVerified")} <br />
          {t("successfully")}
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
            {t("done")}
          </button>
        </Box>
      </div>
    </>
  );
};

export default Verified;
