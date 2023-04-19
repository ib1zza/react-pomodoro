import React from "react";
import s from "./Controls.module.scss";
import { Mode } from "@/App";
import Button from "@components/UI/Button/Button";

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

  const cancelText =
      mode === Mode.ACTIVE ?
      "Cancel" :
      mode === Mode.SHORT_BREAK || mode === Mode.LONG_BREAK ?
      "Skip break" : "Cancel";

  return (
    <div className={s.container}>
      <Button onClick={handlePause} >{pauseText}</Button>
      <Button onClick={handleCancel}>{cancelText}</Button>

    </div>
  );
};

export default Controls;
