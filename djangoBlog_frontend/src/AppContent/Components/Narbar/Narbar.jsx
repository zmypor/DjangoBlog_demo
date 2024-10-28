import { NavLink, useNavigate } from "react-router-dom";
import style from "./Narbar.module.css";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [backgroundOpacity, setBackgroundOpacity] = useState(0);
  const [isHidden, setIsHidden] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchVisible, setIsSearchVisible] = useState(false); // 新增状态
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const maxScroll = 600;
      const newOpacity = Math.min(scrollTop / maxScroll, 1);
      setBackgroundOpacity(newOpacity);
      if (scrollTop > maxScroll + 200) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    if (e.key === "Enter") {
      navigate(`/search?q=${searchQuery}`);
    }
  };

  const toggleSearchVisibility = () => {
    setIsSearchVisible(!isSearchVisible);
  };

  return (
    <nav
      className={`${style.navbar} ${isHidden ? style.hidden : ""}`}
      style={{ backgroundColor: `rgba(152, 192, 240,${backgroundOpacity})` }}
    >
      <div className={style.container}>
        <ul>
          <li>
            <NavLink to="/">
              <div className={style.signal}>
                <img src="/images/home.png"></img>
                <label>首页</label>
              </div>
            </NavLink>
          </li>
          <li>
            <NavLink to="/articles">
              <div className={style.signal}>
                <img src="/images/article.png"></img>
                <label>文章</label>
              </div>
            </NavLink>
          </li>
          <li>
            <NavLink to="/friends">
              <div className={style.signal}>
                <img src="/images/friend.png"></img>
                <label>友链</label>
              </div>
            </NavLink>
          </li>
          <li>
            <NavLink to="/about">
              <div className={style.signal}>
                <img src="/images/about.png"></img>
                <label>关于</label>
              </div>
            </NavLink>
          </li>
          <li>
            <NavLink to="/meg">
              <div className={style.signal}>
                <img src="/images/meg.png"></img>
                <label>留言板</label>
              </div>
            </NavLink>
          </li>
        </ul>
      </div>
      <div className={style.search}>
        <label onClick={toggleSearchVisibility}>
          <img src="/images/search.png"></img>
        </label>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          onKeyDown={handleSearchSubmit}
          className={isSearchVisible ? style.visible : ""}
          placeholder="请输入搜索关键词"
        ></input>
      </div>
    </nav>
  );
}
