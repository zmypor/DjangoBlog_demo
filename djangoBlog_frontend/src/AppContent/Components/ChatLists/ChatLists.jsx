import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import ChatCard from "./ChatCard/ChatCard";
import getChats from "../../Http/chatHttp";
import style from "./ChatLists.module.css";
export default function ChatLists() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [chats, setchats] = useState([]); // 确保初始值为空数组
  const [totalchats, setTotalchats] = useState(0);
  const chatsPerPage = 5;
  // window.scrollTo({
  //     top:0,
  //     behavior:'smooth'
  // })
  useEffect(() => {
    const page = parseInt(searchParams.get("page")) || 1;
    setCurrentPage(page);

    getChats(page, chatsPerPage)
      .then(({ chats, total }) => {
        setchats(chats || []); // 确保articles是一个数组
        setTotalchats(total);
      })
      .catch((error) => {
        console.error("Error fetching articles:", error);
      });
  }, [searchParams]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    setSearchParams({ page: pageNumber });
  };

  const totalPages = Math.ceil(totalchats / chatsPerPage);

  return (
    <>
      {chats.map((chat) => (
        <div className={style.fadeIn}>
          <ChatCard
            url={`/chats/${chat.id}`}
            chat={chat}
            key={chat.id}
          ></ChatCard>
        </div>
      ))}
      <div className={style.pagination}>
        {Array.from({ length: totalPages }, (_, index) => (
          <div>
            <button key={index} onClick={() => handlePageChange(index + 1)}>
              {index + 1}
            </button>
          </div>
        ))}
      </div>
    </>
  );
}
