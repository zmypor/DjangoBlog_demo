import { useEffect, useState } from "react";
import Comment from "../Comment/Comment";
import getMeg, { addComment } from "../../Http/megHttp";
import style from "./Meg.module.css";
export default function Meg() {
  const [data, setMeg] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);

    getMeg()
      .then((data) => {
        setMeg(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);
  const onAddMegComment = (comment) => {
    addComment({ newComment: comment });
  };
  if (loading) {
    return <div>加载中...</div>;
  }

  if (error) {
    return <div>错误: {error.message}</div>;
  }
  return (
    <>
      <div className={style.container}>
        <h1>畅所欲言</h1>
        <Comment
          initialComments={data}
          onAddComment={onAddMegComment}
        ></Comment>
      </div>
    </>
  );
}
