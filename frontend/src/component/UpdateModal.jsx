import CloseIcon from "@mui/icons-material/Close";
import "./Modal.css";
import { useTranslation } from "react-i18next";
import UpdateJobMarket from "../update_component/UpdateJobMarket.jsx";
import UpdateCareerRelatedNews from "../update_component/UpdateCareerRelatedNews.jsx";
import UpdateThandaTalks from "../update_component/UpdateThandaTalks.jsx";
import UpdateContactBook from "../update_component/UpdateContactBook.jsx";

const Modal = (props) => {
  const informationTitle = props.data.PIT;
  const targetData = props.data;
  const { t } = useTranslation();

  return (
    <div className="modal__backdrop">
      <div className="modal__container">
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div style={{ marginLeft: "5vh" }} />
            <h3
              style={{
                marginLeft: "auto",
                marginRight: "auto",
                color: "black",
              }}
            >
              {t("update")}
            </h3>
            <span
              onClick={props.onClose}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CloseIcon
                style={{ height: "5vh", width: "5vh", marginLeft: "auto" }}
              />
            </span>
          </div>
          <div
            style={{
              width: "80vw",
              height: "60vh",
              overflowX: "hidden",
              overflowY: "auto",
              textAlign: "justify",
              color: "black",
            }}
            className="modal__content"
          >
            {informationTitle == "jobMarket" ? (
              <UpdateJobMarket data={targetData} />
            ) : (
              ""
            )}
            {informationTitle == "careerRelatedNews" ? (
              <UpdateCareerRelatedNews data={targetData} />
            ) : (
              ""
            )}
            {informationTitle == "thandaTalks" ? (
              <UpdateThandaTalks data={targetData} />
            ) : (
              ""
            )}
            {informationTitle == "contactBook" ? (
              <UpdateContactBook data={targetData} />
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
