import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { addComment, getChatById } from "../../../Http/chatHttp";
import style from "./Chat.module.css";
import Comment from "../../Comment/Comment";
import Swal from "sweetalert2";
export default function Chat() {
  const { id } = useParams();
  const [chat, setChat] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
    setLoading(true);
    getChatById(id)
      .then((data) => {
        setChat(data);
        console.log(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [id]);
  window.scrollTo({ top: 0, behavior: "smooth" });
  if (loading) {
    return <div>加载中...</div>;
  }

  if (error) {
    return <div>错误: {error.message}</div>;
  }
  const onAddArticleComment = (comment) => {
    try {
      addComment(chat.id, { newComment: comment }).then((res) => {
        if (res.success) {
          showMessage("添加成功", "success");

          setChat((prevChat) => {
            const newChat = {
              ...prevChat,
              comments: [...prevChat.comments, comment],
            };
            return newChat;
          });
        } else {
          showMessage("添加失败", "error");
        }
      });
    } catch (error) {
      showMessage("添加失败", "error");
    }
  };

  return (
    <>
      <div className={style.card}>
        <p className={`${style.content} `}>{chat.content}</p>
        <div className={style.bottom}>
          <div className={style.date}>
            <button>{chat.date}</button>
          </div>
        </div>
      </div>
      <Comment
        initialComments={chat.comments}
        onAddComment={onAddArticleComment}
      >
        onAddComment
      </Comment>
    </>
  );
}
