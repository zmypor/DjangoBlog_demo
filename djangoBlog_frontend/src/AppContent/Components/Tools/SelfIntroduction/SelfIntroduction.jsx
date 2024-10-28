import { useNavigate } from "react-router-dom";
import style from "./SelfIntroduction.module.css";

export default function SelfIntroduction() {
  const navigate = useNavigate();
  const handleImg = () => {
    navigate("/about");
  };
  return (
    <>
      <div className={style.content}>
        <div className={style.avatar}>
          <img src="/images/avatar.png" onClick={handleImg} alt="Avatar"></img>
        </div>
        <div className={style.name}>Believes_</div>
        <div className={style.text}>"我太想进步了啦"</div>
        <div className={style.link}>
          <a
            href="https://gitee.com/Zhigege233"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="/images/gitee.png"
              alt="Gitee"
              className={style.tooltip}
            ></img>
          </a>
          <a
            href="https://github.com/BelieveLiu6"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="/images/github.png"
              alt="GitHub"
              className={style.tooltip}
            ></img>
          </a>
        </div>
      </div>
    </>
  );
}
