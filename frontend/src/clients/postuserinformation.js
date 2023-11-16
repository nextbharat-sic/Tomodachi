import axios from "axios";

export default async function postUserInformation(userInformation) {
  const baseURL =
    "https://yum21t7qvk.execute-api.ap-south-1.amazonaws.com/ST/isp/userinformation";
  const header = { "Content-Type": "application/json" };
  console.log(userInformation);
  try {
    const response = await axios.post(
      baseURL,
      {
        userInformation: userInformation,
      },
      { headers: header },
    );
    return response.data;
  } catch (error) {
    throw new Error("失敗");
  }
}
