import { useState } from "react";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import postdeadlinedate from "./clients/postdeadlinedate.js";

const DeadlineDateModal = (props) => {
  const postId = props.postId;
  const [deadlineDate, setDeadlineDate] = useState("");
  const { t } = useTranslation();
  const dispatch = useDispatch();

  let date = new Date();
  let localDate =
    date.getFullYear() +
    "-" +
    (date.getMonth() + 1).toString().padStart(2, "0") +
    "-" +
    date.getDate().toString().padStart(2, "0");

  const checkDeadlineDate = () => {
    if (deadlineDate >= localDate) {
      return true;
    }
    return false;
  };
  const refreshHome = async () => {
    const storeInitialPage = { type: "CHANGE_PAGE_STATE", payload: "" };
    await dispatch(storeInitialPage);
    const storeHomePage = { type: "CHANGE_PAGE_STATE", payload: "HomePage" };
    dispatch(storeHomePage);
  };
  const handleDeadlineDate = (event) => {
    setDeadlineDate(event.target.value);
  };

  const updateDeadlineDate = async () => {
    if (checkDeadlineDate()) {
      confirm(t("updateDeadlineDate"));
      const deadlineInformation = {
        postId: postId,
        deadlineDate: deadlineDate,
        statusTo: "active",
      };

      const response = await postdeadlinedate(deadlineInformation);

      if (response.status == "Success") {
        alert(t("updateCompleted"));
        refreshHome();
      } else {
        alert(t("updateFailed"));
      }
      props.closeModal();
    } else {
      alert(t("deadlineDatePassed"));
    }
  };
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "rgba(0, 0, 0, 0.65)",
          bottom: 0,
          left: 0,
          position: "fixed",
          right: 0,
          top: 0,
          zIndex: "1",
        }}
      >
        <div
          style={{
            background: "white",
            borderRadius: "5px",
            padding: "3vw",
            height: "20vh",
          }}
        >
          <div
            style={{
              textAlign: "left",
              paddingLeft: "4vw",
              color: "black",
            }}
          >
            <label> {t("selectDeadlineDate")} </label>
          </div>
          <input
            type="date"
            name="deadlineDate"
            value={deadlineDate}
            onChange={handleDeadlineDate}
            style={{
              width: "86vw",
              margin: "10px",
              height: "5vh",
              borderRadius: "10px",
              borderWidth: "1px",
            }}
            required
          />
          <button onClick={props.closeModal}>Cancel</button>
          <button onClick={updateDeadlineDate}>OK</button>
        </div>
      </div>
    </>
  );
};

export default DeadlineDateModal;
