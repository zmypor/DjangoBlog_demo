import config from "./config";

export default async function getArticlesAndChats(page, homePerPage) {
  try {
    const url = new URL(`${config.API_BASE_URL}/api/articles-and-chats/`);
    url.searchParams.append("page", page);
    url.searchParams.append("limit", homePerPage);
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
