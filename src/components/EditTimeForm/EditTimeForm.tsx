import React, { useState } from "react";
import s from "./EditTimeForm.module.scss";
import { Config } from "@/App";

interface IEditTimeFormProps {
  handleSave: (
    e: React.FormEvent<HTMLFormElement>,
    config: { [key in keyof Config]: string | number }
  ) => void;
  config: { [key in keyof Config]: string | number };
}
const EditTimeForm: React.FC<IEditTimeFormProps> = ({ handleSave, config }) => {
  const [pomodoro, setPomodoro] = useState<number | string>(config.pomodoro);
  const [shortBreak, setShortBreak] = useState<number | string>(
    config.shortBreak
  );

  const [longBreak, setLongBreak] = useState<number | string>(config.longBreak);
  const [error, setError] = useState<string | null>(null);

  return (
    <form
      className={s.inputs}
      onSubmit={(e) => handleSave(e, { pomodoro, shortBreak, longBreak })}
    >
      <div>
        <label htmlFor="pomodoro">Pomodoro time: </label>
        <input
          id={"pomodoro"}
          type="number"
          placeholder={String(config.pomodoro)}
          value={pomodoro}
          onChange={(e) => setPomodoro(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="shortBreak">Short break time: </label>
        <input
          id={"shortBreak"}
          type="number"
          value={shortBreak}
          placeholder={String(config.shortBreak)}
          onChange={(e) => setShortBreak(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="longBreak">Long break time: </label>
        <input
          id={"longBreak"}
          type="number"
          value={longBreak}
          placeholder={String(config.longBreak)}
          onChange={(e) => setLongBreak(e.target.value)}
        />
      </div>
      {error && <p className={s.error}>{error}</p>}

      <button className={s.submit}>Save</button>
    </form>
  );
};

export default EditTimeForm;
