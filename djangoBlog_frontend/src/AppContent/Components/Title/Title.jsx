import { useEffect, useState } from "react";
import style from "./Title.module.css";
import loadPoetry from "../../Http/jinrishiciHttp";
export default function Title() {
  const [poetryData, setPoetryData] = useState({});
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    loadPoetry()
      .then((result) => {
        //console.log(result.data)
        setPoetryData(result.data);
      })
      .catch((error) => {
        setPoetryData({
          content: "加载错误,请重试",
          origin: { dynasty: "", author: "" },
        });
        throw new Error(error);
      })
      .then(() => {
        setLoading(false);
      });
  }, []);

  const handleScroll = () => {
    window.scrollTo({
      top: document.getElementById("target").offsetTop,
      behavior: "smooth",
    });
  };

  return (
    <div className={style.titleContent}>
      {isLoading ? (
        <h1>正在加载...</h1>
      ) : (
        <div>
          <h1>
            <em>{poetryData.content}</em>
          </h1>
          <p>
            <strong>
              {`${poetryData.origin.dynasty}`} {`${poetryData.origin.author}`}
            </strong>
          </p>
        </div>
      )}
      {/* <a onClick={handleScroll} id='target'><img 
        src='/public/down.png' 
        alt='Scroll Down' 
        className={style.bounce}
        ></img></a> */}
    </div>
  );
}
