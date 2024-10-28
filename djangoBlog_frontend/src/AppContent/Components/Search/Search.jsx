import { useState, useEffect } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import getSearchResults from "../../Http/searchHttp";
import Card from "../ArticleLists/ArticleCard/Card";
import ChatCard from "../ChatLists/ChatCard/ChatCard";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setLoading] = useState(true);
  const query = searchParams.get("q");
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const searchPerPage = 8;

  useEffect(() => {
    setLoading(true);
    const page = parseInt(searchParams.get("page")) || 1;
    if (query) {
      getSearchResults(query, page)
        .then((results) => {
          setData(results.data);
          setTotal(results.count);
          console.log(results.count);
          setLoading(false);
        })
        .catch((error) => {
          console.error("搜索请求失败", error);
          setLoading(false);
        });
    }
  }, [searchParams]); // 监听 searchParams 的变化

  const handlePageChange = (event, pageNumber) => {
    setSearchParams({ page: pageNumber });
  };

  const totalPages = Math.ceil(total / searchPerPage);
  if (isLoading) {
    return <div>加载中...</div>;
  }
  if (total == 0) {
    return <h2>为查询到对应的文章，请重试！</h2>;
  }
  return (
    <>
      <div>
        {data.map((item, index) => (
          <div key={index}>
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
    </>
  );
}
