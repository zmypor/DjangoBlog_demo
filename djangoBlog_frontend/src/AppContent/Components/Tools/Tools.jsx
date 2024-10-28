import CalendarTool from "./CaledarTool/CalendarTool.jsx";
import SelfIntroduction from "./SelfIntroduction/SelfIntroduction.jsx";
import style from "./Tools.module.css";
export default function Tools() {
  return (
    <div className={style.content}>
      <SelfIntroduction></SelfIntroduction>
      <CalendarTool></CalendarTool>
    </div>
  );
}
