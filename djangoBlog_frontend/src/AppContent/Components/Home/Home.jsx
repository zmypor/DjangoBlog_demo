import Calendar from "react-calendar";
import { useEffect, useState, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import getArticlesAndChats from "../../Http/homeHttp";
import Card from "../ArticleLists/ArticleCard/Card";
import ChatCard from "../ChatLists/ChatCard/ChatCard";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import style from "./Home.module.css";

export default function Home() {
  const [data, setData] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [total, setTotal] = useState(0);
  const homePerPage = 8;
  const bottomRef = useRef(null); // 创建一个引用

  useEffect(() => {
    const page = parseInt(searchParams.get("page")) || 1;
    getArticlesAndChats(page, homePerPage)
      .then((data) => {
        //console.log(data);
        setData(data.results || []);
        setTotal(data.count);
      })
      .catch((error) => {
        console.error("Error fetching articles:", error);
      });
  }, [searchParams]);

  const totalPages = Math.ceil(total / homePerPage);

  const handlePageChange = (event, pageNumber) => {
    setSearchParams({ page: pageNumber });
    //TODO:bug
    setTimeout(() => {
      bottomRef.current.scrollIntoView({
        behavior: "smooth", // 平滑滚动
        block: "end", // 滚动到元素的底部
      });
    }, 0);
  };

  return (
    <>
      <div>
        {data.map((item, index) => (
          <div key={index} className={style.fadeIn}>
            {item.type === "article" ? (
              <Card
                url={`/articles/${item.data.id}`}
                article={item.data}
                key={item.data.id}
              ></Card>
            ) : (
              <ChatCard
                url={`/chats/${item.data.id}`}
                chat={item.data}
                key={item.data.id}
              ></ChatCard>
            )}
          </div>
        ))}
      </div>
      <Stack spacing={2} alignItems="center" marginTop={2} marginLeft={40}>
        <Pagination
          count={totalPages}
          color="primary"
          onChange={handlePageChange}
        />
      </Stack>
      <div ref={bottomRef} style={{ height: "1px" }}></div>{" "}
      {/* 用于滚动到页面底部的元素 */}
    </>
  );
}
