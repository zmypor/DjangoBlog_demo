// import React, { useState, useEffect } from "react";
// import { useSearchParams, useNavigate } from "react-router-dom";
// import Card from "./ArticleCard/Card";
// import getArticles from "../../Http/articleHttp";
// import style from "./ArticleLists.module.css";
// import Pagination from "@mui/material/Pagination";
// import Stack from "@mui/material/Stack";
// export default function ArticleLists() {
//   const [searchParams, setSearchParams] = useSearchParams();
//   const navigate = useNavigate();
//   const [articles, setArticles] = useState([]); // 确保初始值为空数组
//   const [totalArticles, setTotalArticles] = useState(0);
//   const articlesPerPage = 5;

//   useEffect(() => {
//     window.scrollTo({
//       top: 0,
//     });

//     const page = parseInt(searchParams.get("page")) || 1;

//     getArticles(page, articlesPerPage)
//       .then(({ articles, total }) => {
//         setArticles(articles || []); // 确保articles是一个数组
//         setTotalArticles(total);
//       })
//       .catch((error) => {
//         console.error("Error fetching articles:", error);
//       });
//   }, [searchParams]);

//   const handlePageChange = (event, pageNumber) => {
//     setSearchParams({ page: pageNumber });
//   };

//   const handleCardClick = (url) => {
//     navigate(url);
//   };

//   const totalPages = Math.ceil(totalArticles / articlesPerPage);

//   return (
//     <>
//       {articles.map((article, index) => (
//         <div
//           key={article.id}
//           className={style.fadeIn}
//           style={{ animationDelay: `${index * 0.1}s` }}
//         >
//           <Card
//             url={`/articles/${article.id}`}
//             article={article}
//             onClick={() => handleCardClick(`/articles/${article.id}`)}
//           />
//         </div>
//       ))}
//       <Stack spacing={2} alignItems="center" marginTop={2}>
//         <Pagination
//           count={totalPages}
//           color="primary"
//           onChange={handlePageChange}
//         />
//       </Stack>
//     </>
//   );
// }
import { useEffect, useState } from "react";
import style from "./ArticleLists.module.css";
import getTags from "../../Http/tagsHttp";
import { useNavigate } from "react-router-dom";
export default function ArticleLists() {
  const [tags, setTags] = useState();
  useEffect(() => {
    getTags()
      .then((data) => {
        setTags(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  const navigate = useNavigate();

  const handleTagClick = (tag) => {
    navigate(`/search?q=${tag}`);
  };
  return (
    <>
      <div className={style.container}>
        <div className={style.tags}>
          {(tags || []).map((tag, index) => (
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
    </>
  );
}
