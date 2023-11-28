import getUploadInformation from "./clients/getuploadinformation.js";

const Home = () => {
  const openHomeScreen = async () => {
    const result = await getUploadInformation();
    console.log(result);
  };

  openHomeScreen();

  return (
    <>
      <div style={{ border: "1px solid #333", margin: 3 }}>
        Find your job Here! area
      </div>
      <div style={{ border: "1px solid #333", margin: 3 }}>
        <div>Share career information</div>
        <button>Share details</button>
      </div>
      <p>recent post</p>
      <div style={{ border: "1px solid #333", margin: 3 }}>
        <div>Posted information area</div>
        <button>Show more</button>
      </div>
    </>
  );
};

export default Home;
