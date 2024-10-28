import config from "./config";
const getMeg = async () => {
  try {
    const url = new URL(`${config.API_BASE_URL}/api/meg/`);
    const response = await fetch(url);
    const data = await response.json();
    //console.log(data.comments);
    return data.comments;
  } catch (error) {
    throw error;
  }
};
export const addComment = async (updatedData) => {
  try {
    const url = new URL(`${config.API_BASE_URL}/api/meg/add_comment/`);
    //console.log(updatedData);
    // 确保日期字段格式正确
    ///console.log(updatedData);
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    });
    const data = await response.json();
    //console.log(data);
    if (response.ok)
      return {
        success: true,
        data: data,
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
export default getMeg;
