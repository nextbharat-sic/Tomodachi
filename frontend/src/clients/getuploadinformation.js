import axios from "axios";

export default async function getUploadInformation() {
  const GetUploadInfoURL = import.meta.env.VITE_APP_GET_UPLOAD_INFO;
  const header = { "Content-Type": "application/json" };
  try {
    const response = await axios.post(GetUploadInfoURL, {
      headers: header,
    });
    return response.data;
  } catch (error) {
    return error;
  }
}