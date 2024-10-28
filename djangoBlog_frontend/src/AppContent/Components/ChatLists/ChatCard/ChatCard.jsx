import { useState } from 'react';
import style from './ChatCard.module.css';
import { Link } from 'react-router-dom';

export default function ChatCard({ url, chat }) {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <>
            <div className={style.card}>
                <p className={`${style.content} ${isExpanded ? style.expanded : style.collapsed}`}>
                    {chat.content}
                </p>
                <div className={style.bottom}>
                    <div className={style.date}><button>{chat.date}</button></div>
                    <div className={style.link}>
                        <Link to={url}>跳转</Link>
                    </div>
                </div>
                <button onClick={toggleExpand} className={style.expandButton}>
                {isExpanded ? '收起' : '展开'}
            </button>
            </div>
           
        </>
    );
}