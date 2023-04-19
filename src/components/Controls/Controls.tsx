import React from "react";
import s from "./Controls.module.scss";
import { Mode } from "@/App";

interface IControlsProps {
  setMode: React.Dispatch<React.SetStateAction<Mode>>;
  mode: Mode;
}
const Controls: React.FC<IControlsProps> = ({ setMode, mode }) => {
  const prevMode = React.useRef(mode);
  const handlePause = () => {
    if (mode !== Mode.PAUSED) prevMode.current = mode;
    setMode(
      mode === Mode.PAUSED
        ? prevMode.current
        : mode === Mode.NOT_STARTED
        ? Mode.ACTIVE
        : Mode.PAUSED
    );
  };

  const handleCancel = () => {
    setMode(Mode.NOT_STARTED);
  };

  const pauseText =
    mode === Mode.PAUSED
      ? "Resume"
      : mode === Mode.NOT_STARTED
      ? "Start"
      : "Pause";

  return (
    <div className={s.container}>
      <button onClick={handlePause}>{pauseText}</button>
      <button onClick={handleCancel}>Cancel</button>
    </div>
  );
};

export default Controls;
