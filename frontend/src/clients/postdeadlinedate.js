// Copyright © 2025 Suzuki Motor Corporation All Rights Reserved
import axios from "axios";

export default async function postdeadlinedate(deadlineInfo) {
  const postInfoURL = import.meta.env.VITE_APP_CHANGE_DEADLINE_DATE;
  const header = { "Content-Type": "application/json" };
  try {
    const response = await axios.post(postInfoURL, deadlineInfo, {
      headers: header,
    });
    return response.data;
  } catch (error) {
    return error;
  }
}
