import config from "./config";

const getChats = async (page, chatsPerPage) => {
  try {
    const url = new URL(`${config.API_BASE_URL}/api/chats/`);
    url.searchParams.append("page", page);
    url.searchParams.append("limit", chatsPerPage);
    const response = await fetch(url);
    const data = await response.json();
    return {
      chats: data.results,
      total: data.count,
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getChatById = async (id) => {
  try {
    const url = new URL(`${config.API_BASE_URL}/api/chats/${id}`);
    const response = await fetch(url);
    const data = await response.json();
    //console.log(data);
    return data;
  } catch (error) {
    throw error;
  }
};
export const addComment = async (id, updatedData) => {
  try {
    const url = new URL(`${config.API_BASE_URL}/api/chats/${id}/add_comment/`);
    //console.log(updatedData);
    // 确保日期字段格式正确

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    });
    if (response.ok)
      return {
        success: true,
      };
    else {
      return {
        success: false,
      };
    }
  } catch (error) {
    console.error("Error updating article:", error);
    throw error;
  }
};

export default getChats;
