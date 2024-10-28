import { Link, useNavigate } from "react-router-dom";
import style from "./Card.module.css";
import remarkParse from "remark-parse";
import remarkStringify from "remark-stringify";
import { unified } from "unified";

export default function Card({ url, article }) {
  const markdownToText = (markdown) => {
    const processor = unified()
      .use(remarkParse)
      .use(remarkStringify, { bullet: "*", listItemIndent: "one" });
    let text = processor.processSync(markdown).toString();
    text = text.replace(/[\n\s]/g, ""); // 去除换行符和空格
    return text;
  };

  let contentText = markdownToText(article.content);
  contentText = contentText.replace(/#/g, "");

  // 确保 tags 是一个数组
  const tags = Array.isArray(article.tags) ? article.tags : [];
  const navigate = useNavigate();
  const handleTagClick = (tag) => {
    navigate(`/search?q=${tag}`);
  };
  return (
    <>
      <div className={style.card}>
        <Link to={url}>
          <div className={style.title}>{article.title}</div>
          <p className={style.content}>{contentText}</p>
          <div className={style.bottom}>
            <div className={style.date}>
              <button>{article.date}</button>
            </div>
          </div>
        </Link>
        <div className={style.tag}>
          {tags.map((tag, index) => (
            <button key={index} onClick={() => handleTagClick(tag.name)}>
              {tag.name}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
