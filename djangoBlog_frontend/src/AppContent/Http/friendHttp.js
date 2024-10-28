//http://127.0.0.1:8000/api/friends/
import config from "./config";

export default async function getFriends() {
  try {
    const url = new URL(`${config.API_BASE_URL}/api/friends/`);
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
