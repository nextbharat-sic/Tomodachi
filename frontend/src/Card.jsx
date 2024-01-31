import { Fragment } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PhoneIcon from "@mui/icons-material/Phone";
import { useTranslation } from "react-i18next";

const Card = (props) => {
  const informationList = props.informationList;
  // const [dataFromS3, setDataFromS3] = useState(null);
  const { t } = useTranslation();
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

  const checkActive = (pdd) => {
    let date = new Date();
    let localDate =
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
          <a key={match} href={`tel:${match}`}>
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
            width: "85vw",
            marginLeft: "5vw",
          }}
        >
          <div
            style={{
              overflowWrap: "break-word",
              wordBreak: "break-word",
              display: "flex",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginTop: "1.5vh",
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
            {informationList.PIT === "jobMarket" ? (
              checkActive(informationList.PDD) ? (
                <span
                  style={{
                    backgroundColor: "#2f69f6",
                    padding: "0.3em 0.5em",
                    color: "#e0f2f1",
                    textAlign: "center",
                    borderRadius: "0.5em",
                    marginTop: "2vh",
                    marginLeft: "auto",
                    minWidth: "45px",
                    maxHeight: "30px",
                  }}
                >
                  {t("active")}
                </span>
              ) : (
                <span
                  style={{
                    backgroundColor: "#696969",
                    padding: "0.3em 0.5em",
                    color: "#e0f2f1",
                    textAlign: "center",
                    borderRadius: "0.5em",
                    marginTop: "2vh",
                    marginLeft: "auto",
                    minWidth: "45px",
                    maxHeight: "30px",
                  }}
                >
                  {t("close")}
                </span>
              )
            ) : (
              <span></span>
            )}
          </div>
          <div style={{ display: "flex" }}>
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
          <div>
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
          </div>
          {/* Add more details as needed */}
        </div>
      </div>
    </>
  );
};

export default Card;
