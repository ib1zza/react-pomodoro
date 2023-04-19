import React, { useEffect, useRef, useState } from "react";
import s from "./Timer.module.scss";
import { motion, useMotionValue, useMotionValueEvent } from "framer-motion";
import { Config, Mode } from "@/App";
import sound from "@assets/mp3/endsound.mp3";
import { Howl, Howler } from "howler";
interface ITimerProps {
  mode: Mode;
  config: Config;
  setMode: React.Dispatch<React.SetStateAction<Mode>>;
}

export function nextMode(mode: Mode): Mode {
  console.log("nextMode", mode);
  switch (mode) {
    case Mode.ACTIVE:
      return Mode.SHORT_BREAK;
    case Mode.SHORT_BREAK:
      return Mode.LONG_BREAK;
    case Mode.LONG_BREAK:
      return Mode.ACTIVE;
    default:
      return Mode.NOT_STARTED;
  }
}

const getTimeByMode = (config: Config, mode: Mode): number => {
  switch (mode) {
    case Mode.ACTIVE:
      return config.pomodoro * 60;
    case Mode.SHORT_BREAK:
      return config.shortBreak * 60;
    case Mode.LONG_BREAK:
      return config.longBreak * 60;
    default:
      return config.pomodoro * 60;
  }
};

const getFormattedTime = (time: number): string => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return `${minutes < 10 ? "0" : ""}${minutes > 0 ? minutes : "0"}:${
    seconds < 10 ? "0" : ""
  }${seconds > 0 ? seconds : "0"}`;
};

const Timer: React.FC<ITimerProps> = ({ mode, config, setMode }) => {
  let width = 300;
  const userTime = getTimeByMode(config, mode);
  const [progress, setProgress] = useState(0);
  const [timeLeft, setTimeLeft] = useState(userTime);
  const progressRef = useRef(progress);
  const timeLeftRef = useRef(timeLeft);
  const correctMode = useRef(mode);
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
      if (progressRef.current >= 1) {
        console.log("timer finished");
        progressRef.current = 0;
        setProgress(0);
        clearInterval(int);
        setMode(nextMode(mode));
        playEndSound.play();
        return;
      }
      progressRef.current = +(progressRef.current + 1 / userTime).toFixed(2);
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
