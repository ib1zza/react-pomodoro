import React, {useEffect, useRef, useState} from "react";
import s from "./Timer.module.scss";
import {motion} from "framer-motion";
import {Mode} from "@/App";
import sound from "@assets/mp3/endsound.mp3";
import {Howl} from "howler";
import {getFormattedTime} from "@utils/getFormattedTime";
import {nextMode} from "@utils/nextMode";

interface ITimerProps {
  mode: Mode;
  userTime: number;
  setMode: React.Dispatch<React.SetStateAction<Mode>>;
  counter: number;
  setCounter: React.Dispatch<React.SetStateAction<number>>;
}

const Timer: React.FC<ITimerProps> = ({ mode, userTime, setMode, counter, setCounter }) => {
  let width = 300;
  const [progress, setProgress] = useState(0);
  const [timeLeft, setTimeLeft] = useState(userTime);
  const progressRef = useRef(progress);
  const timeLeftRef = useRef(timeLeft);
  const correctMode = useRef(mode);
  const currentCounter = useRef(counter);

  const playEndSound = new Howl({
    src: [sound],
    volume: 0.1,
  });

  useEffect(() => {
    if (mode === Mode.NOT_STARTED) {
      setProgress(0);
      progressRef.current = 0;
      setTimeLeft(userTime);
      timeLeftRef.current = userTime;
      return;
    }
    if (mode === Mode.PAUSED) {
      return;
    }

    if (correctMode.current !== mode) {
      correctMode.current = mode;
      timeLeftRef.current = userTime;
    }

    let int = setInterval(() => {
      if (progressRef.current >= 1 || timeLeftRef.current <=0) {
        console.log("timer finished");
        progressRef.current = 0;
        setProgress(0);
        clearInterval(int);

        if(mode === Mode.ACTIVE) {
          if( currentCounter.current  >= 4){
            setCounter(1)
            currentCounter.current = 1;
          } else {
            currentCounter.current = currentCounter.current + 1;
            setCounter(currentCounter.current);
          }
        }
        setMode(nextMode(mode, currentCounter.current >= 4));
        playEndSound.play();
        return;
      }

      progressRef.current = +((userTime - timeLeftRef.current) / userTime).toFixed(4);
      console.log(userTime, progressRef.current);
      setProgress(progressRef.current);
      timeLeftRef.current = timeLeftRef.current - 1;
      setTimeLeft(timeLeftRef.current);
    }, 1000);

    return () => {
      clearInterval(int);
    };
  }, [mode, userTime]);

  return (
    <div className={s.timer}>
      <audio id={s.audio} src={""}></audio>

      <svg
        id={s.progress}
        width={width}
        height={width}
        viewBox={`0 0 ${width} ${width}`}
      >
        <circle
          cx={width / 2}
          cy={width / 2}
          r={width / 2 - 20}
          pathLength="1"
          className={s.bg}
        />
        <motion.circle
          cx={width / 2}
          cy={width / 2}
          r={width / 2 - 20}
          pathLength="1"
          className={
            s.indicator +
            " " +
            (mode === Mode.LONG_BREAK || mode === Mode.SHORT_BREAK
              ? s.active
              : "")
          }
          strokeDasharray={`${progress}, 1`}
        />
      </svg>
      <div className={s.time}>
        <span>{getFormattedTime(timeLeft)}</span>
      </div>
    </div>
  );
};

export default Timer;
