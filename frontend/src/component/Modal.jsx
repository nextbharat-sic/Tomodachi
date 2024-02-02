import { useState } from "react";
import "./Modal.css";
import mammoth from "mammoth";
import { useTranslation } from "react-i18next";
import HowToUseImage from "../assets/howToUse.png";

const Modal = (props) => {
  const { t } = useTranslation();
  const [modalDisplay, setModalDisplay] = useState("");
  if (props.type == "privacy") {
    fetch("/privacypolicy.docx")
      .then((response) => response.arrayBuffer())
      .then((buffer) => {
        mammoth
          .convertToHtml({ arrayBuffer: buffer })
          .then((result) => {
            setModalDisplay(result.value);
          })
          .done();
      });
  }
  if (props.type == "howTo") {
    fetch("/howToUse.docx")
      .then((response) => response.arrayBuffer())
      .then((buffer) => {
        mammoth
          .convertToHtml({ arrayBuffer: buffer })
          .then((result) => {
            setModalDisplay(result.value);
          })
          .done();
      });
  }

  return (
    <div className="modal__backdrop">
      <div className="modal__container">
        <div>
          <h4
            style={{
              textAlign: "center",
              color: "black",
            }}
          >
            {props.type === "privacy" ? t("termsAndCondition") : t("howToUse")}
          </h4>
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
            <div dangerouslySetInnerHTML={{ __html: modalDisplay }} />
          </div>
          <span
            onClick={props.onClose}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <button
              style={{
                margin: "10px",
                backgroundColor: "#2F69F6",
                color: "#e0f2f1",
              }}
            >
              {t("close")}
            </button>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Modal;
