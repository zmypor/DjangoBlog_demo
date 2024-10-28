import React, { useEffect, useState } from "react";
import style from "./Friend.module.css"; // 导入 CSS 模块
import getFriends from "../../Http/friendHttp";

export default function Friend() {
  const [isloading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  useEffect(() => {
    setLoading(true);
    getFriends()
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  if (isloading) {
    return <>正在加载</>;
  }

  return (
    <div className={style.friendContainer}>
      <h2 className={style.title}>友链</h2>
      <ul className={style.friendList}>
        {data.map((friend, index) => (
          <li className={style.friendItem} key={index}>
            <a
              key={index}
              href={friend.url}
              target="_blank"
              rel="noopener noreferrer"
              className={style.friendLink}
            >
              <img
                src={friend.avatar}
                alt={friend.name}
                className={style.avatar}
              />
              <div className={style.friendName}>{friend.name}</div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
