import "./Loading.css";

const Loading = () => {
  return (
    <>
      <div
        style={{
          position: "absolute",
          zIndex: "1",
          height: "100%",
          width: "100%",
          backgroundColor: "rgba(128, 128, 128, 0.6)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div className="loader"></div>
      </div>
    </>
  );
};
export default Loading;
