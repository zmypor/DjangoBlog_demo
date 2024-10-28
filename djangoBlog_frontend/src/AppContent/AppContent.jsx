import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./Components/Home/Home.jsx";
import UnityWorks from "./Components/UnityWorks/UnityWorks.jsx";
import About from "./Components/About/About.jsx";
import Navbar from "./Components/Narbar/Narbar.jsx";
import Title from "./Components/Title/Title.jsx";
import Tools from "./Components/Tools/Tools.jsx";
import style from "./AppContenet.module.css";
import ArticleLists from "./Components/ArticleLists/ArticleLists.jsx";
import ChatLists from "./Components/ChatLists/ChatLists.jsx";
import Chat from "./Components/ChatLists/Chart/Chat.jsx";
import Article from "./Components/ArticleLists/Article/Article.jsx";
import { DataContext } from "./Context/dataContext.js";
import articles from "./Components/ArticleLists/articles.json";
import Meg from "./Components/Meg/Meg.jsx";
import Search from "./Components/Search/Search.jsx";
import Friend from "./Components/Friend/Friend.jsx";

export default function AppContent() {
  const locationUrl = useLocation();
  const DataValue = {
    articles: articles,
    shuoshuo: [],
  };

  return (
    <>
      <DataContext.Provider value={DataValue}>
        <Navbar />
        <Title />
        <div className={style.content}>
          <main className={style.main}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/articles" element={<ArticleLists />} />
              <Route path="/articles/:id" element={<Article />} />
              <Route path="/friends" element={<Friend />} />
              {/* <Route path="/chats" element={<ChatLists />} />
              <Route path="/chats/:id" element={<Chat />} /> */}
              <Route path="/about" element={<About />} />
              <Route path="/meg" element={<Meg></Meg>} />
              <Route path="/search" element={<Search />}></Route>
              {/* <Route path='/unity' element={<UnityWorks />} /> */}
            </Routes>
          </main>
          <aside className={style.rightBar}>
            <Tools></Tools>
          </aside>
        </div>
        <footer className={style.footer}>
          <div className={style.description}>
            ©Believes_.Nothing Is Imposible
          </div>
          <div className={style.recordNumber}>
            备案号：
            <a
              href="https://beian.miit.gov.cn/"
              target="_blank"
              rel="noopener noreferrer"
            >
              你的备案号
            </a>
          </div>
        </footer>
      </DataContext.Provider>
    </>
  );
}
