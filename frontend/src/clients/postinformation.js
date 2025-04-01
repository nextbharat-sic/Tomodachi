// Copyright © 2025 Suzuki Motor Corporation All Rights Reserved
import axios from "axios";

export default async function postInformation(information) {
  const postInfoURL = import.meta.env.VITE_APP_POST_INFO;
  const header = { "Content-Type": "application/json" };
  try {
    const response = await axios.post(postInfoURL, information, {
      headers: header,
    });
    return response.data;
  } catch (error) {
    return error;
  }
}
