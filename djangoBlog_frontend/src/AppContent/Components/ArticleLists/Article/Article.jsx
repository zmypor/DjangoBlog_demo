import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import style from "./Article.module.css";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import Swal from "sweetalert2";
import { getArticleById, addComment } from "../../../Http/articleHttp";
import Comment from "../../Comment/Comment";
import MarkdownNavbar from "markdown-navbar";
import "markdown-navbar/dist/navbar.css";
import "markdown-navbar/dist/navbar.css";

export default function Article() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const showMessage = (message, state) => {
    Swal.fire({
      icon: state,
      title: message,
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
    });
  };

  useEffect(() => {
    // 根据 id 向后端发送请求
    setLoading(true);
    getArticleById(id)
      .then((data) => {
        setArticle(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  const onAddArticleComment = (comment) => {
    try {
      addComment(article.id, { newComment: comment }).then((res) => {
        if (res.success) {
          showMessage("添加成功", "success");

          setArticle((prevArticle) => {
            const newArticle = {
              ...prevArticle,
              comments: [...prevArticle.comments, comment],
            };
            return newArticle;
          });
        } else {
          showMessage("添加失败", "error");
        }
      });
    } catch (error) {
      showMessage("添加失败", "error");
    }
  };

  if (loading) {
    return <div>加载中...</div>;
  }

  if (error) {
    return <div>错误: {error.message}</div>;
  }

  const handleTagClick = (tag) => {
    navigate(`/search?q=${tag}`);
  };

  return (
    <>
      <div className={style.articleContainer} id="target">
        <div className={style.leftbar}>
          <div className={style.navbar}>
            <MarkdownNavbar source={article?.content || ""} ordered={false} />
          </div>
        </div>
        <div className={style.contents}>
          <div className={style.article}>
            {" "}
            <h1 className={style.title}>{article?.title}</h1>
            <p className={style.meta}>
              <span>{article?.date}</span>
            </p>
            <ReactMarkdown
              className={style.content}
              components={{
                code({ node, inline, className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || "");
                  return !inline && match ? (
                    <SyntaxHighlighter
                      style={materialDark}
                      language={match[1]}
                      PreTag="div"
                      showLineNumbers={true} // 添加行号
                      className={style.codeBlock} // 应用样式
                      {...props}
                    >
                      {String(children).replace(/\n$/, "")}
                    </SyntaxHighlighter>
                  ) : (
                    <code className={className} {...props}>
                      {children}
                    </code>
                  );
                },
              }}
            >
              {article?.content}
            </ReactMarkdown>
            <div className={style.tags}>
              {(article?.tags || []).map((tag, index) => (
                <span
                  key={index}
                  className={style.tag}
                  onClick={() => handleTagClick(tag.name)}
                >
                  {tag.name}
                </span>
              ))}
            </div>
          </div>
          <div className={style.comments}>
            <Comment
              initialComments={article.comments}
              onAddComment={onAddArticleComment}
            ></Comment>
          </div>
        </div>
      </div>
    </>
  );
}
