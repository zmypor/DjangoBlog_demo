import { useState } from "react";
import md5 from "md5";
import Swal from "sweetalert2";
import style from "./Comment.module.css";
import { deleteComment, updataComment } from "../../Http/commentHttp";

export default function Comment({ initialComments, onAddComment }) {
  const [comments, setComments] = useState(initialComments);
  const [newComment, setNewComment] = useState("");
  const [newAuthor, setAuthor] = useState("");
  const [newEmail, setEmail] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingContent, setEditingContent] = useState("");

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

  const handleInputChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleAuthorChange = (e) => {
    setAuthor(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const getAvatarUrl = (email) => {
    if (!email) {
      console.error("getAvatarUrl: email is undefined or empty");
      return;
    }
    if (email.endsWith("@qq.com")) {
      const qqNumber = email.split("@")[0];
      return `https://q1.qlogo.cn/g?b=qq&nk=${qqNumber}&s=100`;
    } else {
      const trimmedEmail = email.trim().toLowerCase();
      const hash = md5(trimmedEmail);
      return `https://www.gravatar.com/avatar/${hash}`;
    }
  };

  const showErrorToast = (message) => {
    Swal.fire({
      icon: "error",
      title: message,
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
    });
  };

  const handleAddComment = () => {
    if (newComment.trim() === "") {
      showErrorToast("评论内容是必填项");
      return;
    }

    if (newAuthor.trim() === "") {
      showErrorToast("昵称是必填项");
      return;
    }

    if (newEmail === "") {
      showErrorToast("邮箱是必填项");
      return;
    }

    if (!validateEmail(newEmail)) {
      showErrorToast("请输入有效的邮箱地址");
      return;
    }

    const trimmedEmail = newEmail.trim().toLowerCase();
    const newCommentObject = {
      author: newAuthor,
      email: trimmedEmail,
      date: new Date().toLocaleDateString().replace(/\//g, "-"),
      content: newComment,
      avatar: getAvatarUrl(trimmedEmail),
      timestamp: new Date().toISOString(),
    };
    setComments([...comments, newCommentObject]);
    onAddComment(newCommentObject);
    setNewComment("");
    setAuthor("");
    setEmail("");
  };

  const handleCommentDelete = (index) => {
    const id = comments[index].id;
    deleteComment(id).then((res) => {
      if (res.success) {
        showMessage("删除成功", "success");
        setComments(comments.filter((_, i) => i !== index)); //过滤掉删除的评论
      }
    });
  };

  const handleCommentEdit = (index) => {
    setEditingIndex(index);
    setEditingContent(comments[index].content);
  };

  const handleEditingContentChange = (e) => {
    setEditingContent(e.target.value);
  };

  const handleSaveEdit = (index) => {
    const updatedComments = [...comments];
    updatedComments[index].content = editingContent;
    setEditingIndex(null);
    setEditingContent("");
    const updatedData = updatedComments[index];
    const id = updatedComments[index].id;
    updataComment(id, updatedData).then((res) => {
      if (res.success) {
        showMessage("修改成功", "success");
      }
    });
  };
  return (
    <div className={style.section}>
      <h2>评论区维护中</h2>
    </div>
  );
  return (
    <div className={style.section}>
      <h2>评论区</h2>
      <div className={style.input}>
        <textarea
          value={newComment}
          onChange={handleInputChange}
          placeholder="写下你的评论"
        ></textarea>
        <div className={style.authorEmail}>
          <div>
            <label>昵称:</label>
            <input
              type="text"
              placeholder="输入你的昵称"
              value={newAuthor}
              onChange={handleAuthorChange}
            />
          </div>
          <div>
            <label>邮箱:</label>
            <input
              type="text"
              placeholder="输入你的邮箱"
              value={newEmail}
              onChange={handleEmailChange}
              onBlur={() => {
                if (newEmail && newEmail.trim() !== "") {
                  setEmail(newEmail.trim().toLowerCase());
                }
              }}
            />
          </div>
        </div>
        <button onClick={handleAddComment}>添加评论</button>
      </div>
      <hr />
      <div className={style.list}>
        {(comments || []).map((comment, index) => (
          <div key={index} className={style.comment}>
            <div>
              <img
                src={comment.avatar}
                alt={`${comment.author}的头像`}
                className={style.avatar}
              />
              <strong>{comment.author}</strong> ({comment.date})
            </div>
            {editingIndex === index ? (
              <div>
                <textarea
                  value={editingContent}
                  onChange={handleEditingContentChange}
                ></textarea>
                <button onClick={() => handleSaveEdit(index)}>保存</button>
              </div>
            ) : (
              <div>{comment.content}</div>
            )}
            <div className={style.commentActions}>
              <button onClick={() => handleCommentEdit(index)}>编辑</button>
              <button onClick={() => handleCommentDelete(index)}>删除</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
