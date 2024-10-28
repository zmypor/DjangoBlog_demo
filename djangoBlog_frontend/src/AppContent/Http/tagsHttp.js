import config from "./config";

const getTags = async () => {
  const url = new URL(`${config.API_BASE_URL}/api/tags/`);
  // 发送GET请求到后端API
  const response = await fetch(url);

  // 处理响应数据
  const data = await response.json();
  return data;
};
export default getTags;
