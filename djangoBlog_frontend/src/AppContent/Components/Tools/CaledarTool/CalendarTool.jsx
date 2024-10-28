import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import style from "./CalenderTool.module.css";
import { useState } from "react";
import LoginModal from "../../LoginModal/LoginModal";

export default function CalendarTool() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDayClick = (value) => {
    setSelectedDate(value);
  };

  const handleDoubleClick = (event) => {
    const today = new Date();
    if (
      selectedDate &&
      selectedDate.getDate() === today.getDate() &&
      selectedDate.getMonth() === today.getMonth() &&
      selectedDate.getFullYear() === today.getFullYear()
    ) {
      setIsModalOpen(true);
    }
  };

  return (
    <div className={style.content}>
      <div onDoubleClick={handleDoubleClick}>
        <Calendar
          className={style.reactCalendar}
          locale="en"
          onClickDay={handleDayClick}
        />
        <hr />
        #待开发(备忘录)
      </div>
      <LoginModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
