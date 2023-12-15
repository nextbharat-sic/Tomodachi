import { useState, useEffect } from "react";
import "./Modal.css";
import mammoth from "mammoth";

const Modal = (props) => {
  const [privacyPolicy, setprivacyPolicy] = useState("");
  fetch("/privacypolicy.docx")
    .then((response) => response.arrayBuffer())
    .then((buffer) => {
      mammoth
        .extractRawText({ arrayBuffer: buffer })
        .then((result) => {
          setprivacyPolicy(result.value);
        })
        .done();
    });

  return (
    <div className="modal__backdrop">
      <div className="modal__container">
        <div>
          <h4
            style={{
              textAlign: "center",
            }}
          >
            Terms and Condition
          </h4>
          <div
            style={{
              width: "80vw",
              height: "80vh",
              overflowX: "hidden",
              overflowY: "auto",
              textAlign: "justify",
              color: "black",
            }}
          >
            <p>{privacyPolicy}</p>
          </div>
          <span onClick={props.onClose} style={{}}>
            <button>close</button>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Modal;
