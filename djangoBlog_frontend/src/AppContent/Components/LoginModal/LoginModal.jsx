import style from "./LoginModal.module.css";
import Modal from "react-modal";
import React from "react";

Modal.setAppElement("#root");

export default function LoginModal({ isOpen, onRequestClose }) {
  const handleSubmit = (event) => {
    event.preventDefault();
    // 在这里可以添加表单验证逻辑
    window.location.href = "http://127.0.0.1:8000/admin/";
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className={style.modal}
      overlayClassName={style.overlay}
    >
      <h2>登录</h2>
      <form onSubmit={handleSubmit}>
        <label>
          用户名:
          <input type="text" name="username" />
        </label>
        <label>
          密码:
          <input type="password" name="password" />
        </label>
        <button type="submit">登录</button>
      </form>
      <button onClick={onRequestClose}>关闭</button>
    </Modal>
  );
}
