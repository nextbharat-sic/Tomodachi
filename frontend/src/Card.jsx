import { Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PhoneIcon from "@mui/icons-material/Phone";
import postCallInformation from "./clients/postcallinformation.js";
import postdeadlinedate from "./clients/postdeadlinedate.js";
import deleteInformation from "./clients/deleteuploadinformation.js";
import { useTranslation } from "react-i18next";

const Card = (props) => {
  const informationList = props.informationList;
  const userId = useSelector((state) => state.userID);
  const pageStatus = useSelector((state) => state.pageStatus);
  // const [dataFromS3, setDataFromS3] = useState(null);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const replaceDate = (PCT) => {
    const day = PCT.split("-")[2].split("/")[0];
    const month = PCT.split("-")[1];
    const time = PCT.split("-")[2].split("/")[1];
    return (
      day +
      " " +
      monthNames[Number(month) - 1] +
      ", " +
      time.split(":")[0] +
      ":" +
      time.split(":")[1]
    );
  };

  const date = new Date();
  const checkActive = (pdd) => {
    const localDate =
      date.getFullYear() +
      "-" +
      (date.getMonth() + 1).toString().padStart(2, "0") +
      "-" +
      date.getDate().toString().padStart(2, "0");
    if (localDate <= pdd) {
      return true;
    } else {
      return false;
    }
  };

  const refreshPage = async () => {
    const storeInitialPage = { type: "CHANGE_PAGE_STATE", payload: "" };
    await dispatch(storeInitialPage);
    if (pageStatus == "HomePage") {
      const storeHomePage = { type: "CHANGE_PAGE_STATE", payload: "HomePage" };
      dispatch(storeHomePage);
    } else if (pageStatus == "MyPostPage") {
      const storeMyPostPage = {
        type: "CHANGE_PAGE_STATE",
        payload: "MyPostPage",
      };
      dispatch(storeMyPostPage);
    }
  };

  const changeToClose = async () => {
    const pastDate =
      date.getFullYear() -
      1 +
      "-" +
      (date.getMonth() + 1).toString().padStart(2, "0") +
      "-" +
      date.getDate().toString().padStart(2, "0");
    const isConfirm = confirm(t("changeToClose"));
    if (isConfirm) {
      const deadlineInformation = {
        postId: informationList.PID,
        informationTitle: informationList.PIT,
        postUserId: informationList.PUID,
        deadlineDate: pastDate,
      };
      const response = await postdeadlinedate(deadlineInformation);
      if (response.status == "Success") {
        alert(t("recruitmentHasClosed"));
        refreshPage();
      } else {
        alert(t("updateFailed"));
      }
    }
  };

  const isRecruiter = () => {
    if (informationList.PUID == userId) {
      return true;
    }
    return false;
  };

  const phoneCount = (event) => {
    const callInformation = {
      contactNumber: event.currentTarget.textContent,
    };
    postCallInformation(callInformation);
  };

  const renderLinkedText = (text) => {
    const combinedRegex = /(?:https?|ftp):\/\/\S+|\b\d{5}\s?\d{5}\b/g;
    const matches = text.match(combinedRegex);
    const parts = text.split(combinedRegex);

    const renderLink = (match) => {
      if (match.startsWith("http")) {
        return (
          <a key={match} href={match} target="_blank" rel="noopener noreferrer">
            {match}
          </a>
        );
      } else {
        return (
          <a key={match} href={`tel:${match}`} onClick={phoneCount}>
            {match}
          </a>
        );
      }
    };

    const renderParts = () =>
      parts.map((part, index) => (
        <Fragment key={index}>
          {index > 0 && renderLink(matches[index - 1])}
          {part}
        </Fragment>
      ));

    return <>{renderParts()}</>;
  };

  const deleteUploadInformation = () => {
    const isConfirm = confirm(t("confirmDelete"));
    if (isConfirm) {
      deleteUploadInfo();
    }
  };

  const deleteUploadInfo = async () => {
    try {
      const myPostsInformation = {
        postId: informationList.PID,
        informationTitle: informationList.PIT,
      };

      const response = await deleteInformation(myPostsInformation);

      if (response.status === "Success") {
        refreshPage();
        alert(t("updateCompleted"));
      } else {
        alert(t("updateFailed"));
      }
    } catch (error) {
      console.error(t("errorUpdating"), error);
    }
  };

  return (
    <>
      <div
        style={{
          width: "92vw",
          marginBottom: "1em",
          borderRadius: "10px",
          boxShadow:
            "0.2em 0.2em 0em rgba(0, 0, 0, 0.1),-0.05em -0.2em 0.2em rgba(0, 0, 0, 0.1)",
          backgroundColor: "#ffffff",
          color: "#000000",
        }}
      >
        <div
          style={{
            position: "relative",
          }}
        >
          <div
            style={{
              overflowWrap: "break-word",
              wordBreak: "break-word",
              display: "flex",
              width: "92vw",
              borderBottom: "0.2vh solid #BDCDF8",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginTop: "1.5vh",
                marginLeft: "5vw",
                marginBottom: "1.5vh",
              }}
            >
              <AccountCircleIcon
                sx={{ fontSize: 40 }}
                style={{ color: "#000080" }}
              />
              <div
                style={{
                  fontFamily: "DM sans",
                  fontWeight: "Bold",
                  marginLeft: "3vw",
                }}
              >
                {informationList.PAN}
              </div>
            </div>
            {informationList.PIT === "jobMarket" && !isRecruiter() ? (
              checkActive(informationList.PDD) ? (
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    textAlign: "center",
                    backgroundColor: "#E4EBFF",
                    padding: "0.3em 0.5em",
                    color: "black",
                    borderRadius: "0.5em",
                    marginTop: "1vh",
                    height: "3vh",
                    marginLeft: "auto",
                    marginRight: "2vw",
                  }}
                >
                  {t("active")}
                </span>
              ) : (
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    textAlign: "center",
                    backgroundColor: "#DCDCDC",
                    padding: "0.3em 0.5em",
                    color: "black",
                    borderRadius: "0.5em",
                    marginTop: "1vh",
                    height: "3vh",
                    marginLeft: "auto",
                    marginRight: "2vw",
                  }}
                >
                  {t("close")}
                </span>
              )
            ) : (
              <span></span>
            )}
            {informationList.PIT === "jobMarket" && isRecruiter() ? (
              checkActive(informationList.PDD) ? (
                <button
                  onClick={changeToClose}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    textAlign: "center",
                    backgroundColor: "#2f69f6",
                    padding: "0.3em 0.4em",
                    color: "#e0f2f1",
                    borderRadius: "0.5em",
                    marginTop: "1vh",
                    height: "4.5vh",
                    marginLeft: "auto",
                    marginRight: "2vw",
                  }}
                >
                  {t("active")}
                </button>
              ) : (
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    textAlign: "center",
                    backgroundColor: "#696969",
                    padding: "0.3em 0.5em",
                    color: "#e0f2f1",
                    borderRadius: "0.5em",
                    marginTop: "1vh",
                    height: "3vh",
                    marginLeft: "auto",
                    marginRight: "2vw",
                  }}
                >
                  {t("close")}
                </span>
              )
            ) : (
              <span></span>
            )}
          </div>
          <div style={{ marginLeft: "5vw" }}>
            <div style={{ display: "flex", marginTop: "0.5vh" }}>
              <div
                style={{
                  overflowWrap: "break-word",
                  maxWidth: "80vw",
                  fontFamily: "DM sans-serif",
                  fontSize: "120%",
                  fontWeight: "Bold",
                  marginLeft: "0.5em",
                }}
              >
                {informationList.PTI}
              </div>
            </div>
            <div style={{ marginTop: "0.5vh" }}>
              {informationList.PIT === "thandaTalks" ? (
                <span
                  style={{
                    backgroundColor: "#f5f5f5",
                    border: "0.2em solid #f5f5f5",
                    borderRadius: "1em",
                    paddingRight: "0.3em",
                    paddingLeft: "0.3em",
                    marginLeft: "2vw",
                    fontSize: "0.9em",
                  }}
                >
                  {t("thandaTalks")}
                </span>
              ) : informationList.PIT === "jobMarket" ? (
                <span
                  style={{
                    backgroundColor: "#f5f5f5",
                    border: "0.2em solid #f5f5f5",
                    borderRadius: "1em",
                    paddingRight: "0.3em",
                    paddingLeft: "0.3em",
                    marginLeft: "2vw",
                    fontSize: "0.9em",
                  }}
                >
                  {t("jobMarket")}
                </span>
              ) : informationList.PIT === "careerRelatedNews" ? (
                <span
                  style={{
                    backgroundColor: "#f5f5f5",
                    border: "0.2em solid #f5f5f5",
                    borderRadius: "1em",
                    paddingRight: "0.3em",
                    paddingLeft: "0.3em",
                    marginLeft: "2vw",
                    fontSize: "0.9em",
                  }}
                >
                  {t("careerRelatedNews")}
                </span>
              ) : (
                <span></span>
              )}
              {informationList.PIT === "thandaTalks" ? (
                <span
                  style={{
                    backgroundColor: "#f5f5f5",
                    border: "0.2em solid #f5f5f5",
                    borderRadius: "1em",
                    paddingRight: "0.3em",
                    paddingLeft: "0.3em",
                    marginLeft: "2vw",
                    fontSize: "0.9em",
                  }}
                >
                  {t("tunikalaThanda")}
                </span>
              ) : informationList.PIT === "jobMarket" ? (
                <span
                  style={{
                    backgroundColor: "#f5f5f5",
                    border: "0.2em solid #f5f5f5",
                    borderRadius: "1em",
                    paddingRight: "0.3em",
                    paddingLeft: "0.3em",
                    marginLeft: "2vw",
                    fontSize: "0.9em",
                  }}
                >
                  {informationList.PMJ === "indoor"
                    ? t("indoor")
                    : informationList.PMJ === "outdoor"
                    ? t("outdoor")
                    : ""}
                </span>
              ) : informationList.PIT === "contactBook" ? (
                <div style={{ display: "flex", alignItems: "center" }}>
                  <PhoneIcon />
                  <span
                    style={{
                      paddingRight: "0.3em",
                      paddingLeft: "0.3em",
                      fontSize: "1em",
                    }}
                  >
                    {renderLinkedText(informationList.PCN)}
                  </span>
                </div>
              ) : (
                <span></span>
              )}
            </div>
            <div
              style={{
                position: "relative",
                overflowWrap: "break-word",
                margin: "0.5em",
                whiteSpace: "pre-wrap",
              }}
            >
              {renderLinkedText(informationList.PDE)}
            </div>
            {/* <div>
                    {dataFromS3 ? (
                      <img
                        src={dataFromS3}
                        alt="S3から取得した画像"
                        style={{ width: "10vw", height: "10vh" }}
                      />
                    ) : (
                      <p>Loading...</p>
                    )}
                  </div>*/}
            <div
              style={{
                fontSize: "0.8em",
                margin: "0.5em",
                paddingBottom: "10px",
              }}
            >
              {t("postedAt")} {replaceDate(String(informationList.PCT))}
              {pageStatus == "MyPostPage" ? (
                <div style={{ display: "flex", justifyContent: "flexEnd" }}>
                  <button
                    style={{
                      backgroundColor: "#2f69f6",
                      padding: "0.3em 0.5em",
                      color: "#e0f2f1",
                      textAlign: "center",
                      borderRadius: "0.5em",
                      marginTop: "2vh",
                      marginLeft: "auto",
                      minWidth: "60px",
                      maxHeight: "30px",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    {t("edit")}
                  </button>
                  <button
                    onClick={deleteUploadInformation}
                    style={{
                      backgroundColor: "#2f69f6",
                      padding: "0.3em 0.5em",
                      color: "#e0f2f1",
                      textAlign: "center",
                      borderRadius: "0.5em",
                      marginTop: "2vh",
                      marginLeft: "5vw",
                      minWidth: "60px",
                      maxHeight: "30px",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    {t("delete")}
                  </button>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
          {/* Add more details as needed */}
        </div>
      </div>
    </>
  );
};

export default Card;
