// Copyright © 2025 Suzuki Motor Corporation All Rights Reserved
import axios from "axios";

export default async function getUploadInformation(informationTitle) {
  const getUploadInfoURL = import.meta.env.VITE_APP_GET_UPLOAD_INFO;
  const header = { "Content-Type": "application/json" };
  try {
    const response = await axios.post(getUploadInfoURL, informationTitle, {
      headers: header,
    });
    return response.data;
  } catch (error) {
    return error;
  }
}
