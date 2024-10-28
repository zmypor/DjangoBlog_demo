import config from "./config";
const getAbout = async () => {
  try {
    const url = new URL(`${config.API_BASE_URL}/api/about/`);
    const response = await fetch(url);
    const data = await response.json();
    //console.log(data)
    return data;
  } catch (error) {
    throw error;
  }
};

export default getAbout;
