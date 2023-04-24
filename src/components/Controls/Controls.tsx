import React from "react";
import s from "./Controls.module.scss";
import { Mode } from "@/App";
import Button from "@components/UI/Button/Button";
import { faPause, faPlay, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
    mode === Mode.ACTIVE
      ? "Cancel"
      : mode === Mode.SHORT_BREAK || mode === Mode.LONG_BREAK
      ? "Skip break"
      : "Cancel";

  return (
    <div className={s.container}>
      <Button onClick={handlePause}>
        {mode === Mode.PAUSED || mode === Mode.NOT_STARTED ? (
          <FontAwesomeIcon icon={faPlay} />
        ) : (
          <FontAwesomeIcon icon={faPause} />
        )}
        {pauseText}
      </Button>
      {mode !== Mode.NOT_STARTED && (
        <Button onClick={handleCancel}>
          <FontAwesomeIcon icon={faXmark} /> {cancelText}
        </Button>
      )}
    </div>
  );
};

export default Controls;
