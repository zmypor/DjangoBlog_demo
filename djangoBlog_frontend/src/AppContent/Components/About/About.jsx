import { useEffect, useState } from "react";
import getAbout from "../../Http/aboutHttp";
import style from "./About.module.css";
import ReactMarkdown from "react-markdown";
import MarkdownNavbar from "markdown-navbar";
export default function About() {
  const [data, setAbout] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    getAbout()
      .then((data) => {
        setAbout(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className={style.container}>
        <div className={style.leftbar}>
          <div className={style.navbar}></div>
        </div>
        <div className={style.contents}>
          <div className={style.article}>
            <h1>加载中</h1>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={style.container}>
        <div className={style.leftbar}>
          <div className={style.navbar}></div>
        </div>
        <div className={style.contents}>
          <div className={style.article}>
            <h1>错误: {error.message}</h1>
          </div>
        </div>
      </div>
    );
  }
  return (
    <>
      <div className={style.container}>
        <div className={style.leftbar}>
          <div className={style.navbar}>
            <MarkdownNavbar source={data?.content || ""} ordered={false} />
          </div>
        </div>
        <div className={style.contents}>
          <div className={style.article}>
            <h1>{data.title}</h1>
            <ReactMarkdown className={style.content}>
              {data?.content}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    </>
  );
}
