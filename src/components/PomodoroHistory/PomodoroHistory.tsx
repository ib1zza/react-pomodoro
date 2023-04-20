import React from 'react';
import s from './PomodoroHistory.module.scss';
import {motion} from "framer-motion";
interface IPomodoroHistoryProps {
    history: HistoryItem[]
}

export interface HistoryItem {
    id: number;
    timeStart: number;
    timeEnd: number;
    pomodoroLength: number;
}

// gets time in milliseconds returns HH:MM
export const formatTime = (time: number) => {
    const date = new Date(time);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    return `${hours < 10 ? "0" : ""}${hours > 0 ? hours : "0"}:${
        minutes < 10 ? "0" : ""
    }${minutes > 0 ? minutes : "0"}`;
}

const PomodoroHistory: React.FC<IPomodoroHistoryProps> = ({history}) => {
    return (
        <div className={s.container}>

            <motion.div layout className={s.total}>Completed · {history.length}</motion.div>
            {
                history.map((item, index) => {
                    return <motion.div animate={{opacity: 1}} initial={{opacity: 0}} key={item.id} className={s.item}>
                        <div className={s.index}>
                        {index + 1}.
                        </div>

                        <div className={s.time + " " + s.time__start}>
                             <span>Time start: </span>{formatTime(item.timeStart)}
                        </div>

                        <div className={s.time + " " + s.time__end}>
                            <span>Time end: </span>{formatTime(item.timeEnd)}
                        </div>

                        <div className={s.time + " " + s.time__end}>
                            <span>Work time: </span>{(item.pomodoroLength / 60).toFixed(1)} minutes
                        </div>

                    </motion.div>
                })
            }
        </div>
    );
};

export default PomodoroHistory;