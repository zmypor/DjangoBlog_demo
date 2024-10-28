import config from "./config";
// 定义请求函数
const getArticles = async (page, articlesPerPage) => {
  try {
    // 构建带有查询参数的URL
    const url = new URL(`${config.API_BASE_URL}/api/articles/`);
    url.searchParams.append("page", page);
    url.searchParams.append("limit", articlesPerPage);

    // 发送GET请求到后端API
    const response = await fetch(url);

    // 处理响应数据
    const data = await response.json();
    console.log(data);
    return {
      articles: data.results, // 确保与Django返回的数据结构匹配
      total: data.count,
    };
  } catch (error) {
    console.error("Error fetching articles:", error);
    throw error;
  }
};
export const getArticleById = async (id) => {
  try {
    const url = new URL(`${config.API_BASE_URL}/api/articles/${id}/`);
    const response = await fetch(url);

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching article:", error);
    throw error;
  }
};

export const addComment = async (id, updatedData) => {
  try {
    const url = new URL(
      `http://127.0.0.1:8000/api/articles/${id}/add_comment/`
    );
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

export default getArticles;
