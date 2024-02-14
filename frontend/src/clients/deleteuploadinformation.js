import axios from "axios";

export default async function deleteUploadInformation(myPostsInformation) {
  const deleteUploadInfoURL = import.meta.env.VITE_APP_DELETE_UPLOAD_INFO;
  const header = { "Content-Type": "application/json" };
  try {
    const response = await axios.post(deleteUploadInfoURL, myPostsInformation, {
      headers: header,
    });
    return response.data;
  } catch (error) {
    return error;
  }
}
