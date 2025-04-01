// Copyright © 2025 Suzuki Motor Corporation All Rights Reserved
import axios from "axios";

export default async function updateInformation(information) {
  const updateInfoURL = import.meta.env.VITE_APP_UPDATE_INFORMATION;
  const header = { "Content-Type": "application/json" };
  try {
    const response = await axios.post(updateInfoURL, information, {
      headers: header,
    });
    return response.data;
  } catch (error) {
    return error;
  }
}
