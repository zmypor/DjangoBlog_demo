import config from "./config";
const getSearchResults = async (query, searchPerPage) => {
  try {
    const url = new URL(
      `${config.API_BASE_URL}/api/articles-and-chats/?q=${query}`
    );
    url.searchParams.append("page", searchPerPage);
    const response = await fetch(url, {
      method: "POST",
    });
    const data = await response.json();
    console.log(data);
    return {
      data: data.results,
      count: data.count,
    };
  } catch (error) {
    throw error;
  }
};
export default getSearchResults;
