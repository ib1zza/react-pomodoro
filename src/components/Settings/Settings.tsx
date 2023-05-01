import React, { useState } from "react";
import s from "./Settings.module.scss";
import { Config } from "@/App";

interface ISettingsProps {
  config: Config;
  setConfig: React.Dispatch<React.SetStateAction<Config>>;
  close: () => void;
}

const testNum = (s: number | string) => {
  return /\d+$/.test(String(s).trim()) && +s > 0 && +s < 300;
};

const Settings: React.FC<ISettingsProps> = ({ close, setConfig, config }) => {
  const [pomodoro, setPomodoro] = useState<string | number>(config.pomodoro);
  const [shortBreak, setShortBreak] = useState<string | number>(
    config.shortBreak
  );
  const [longBreak, setLongBreak] = useState<string | number>(config.longBreak);
  const [error, setError] = useState<string | null>(null);

  function handleSave(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log("save");

    if (testNum(pomodoro) && testNum(shortBreak) && testNum(longBreak)) {
      setConfig({
        pomodoro: +pomodoro,
        shortBreak: +shortBreak,
        longBreak: +longBreak,
      });
      close();
    } else {
      setError("wrong input");
    }
  }

  return (
    <form className={s.inputs} onSubmit={handleSave}>
      <div>
        <label htmlFor="pomodoro">Pomodoro time: </label>
        <input
          id={"pomodoro"}
          type="number"
          placeholder={config.pomodoro.toFixed(0)}
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
          placeholder={config.shortBreak.toFixed(0)}
          onChange={(e) => setShortBreak(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="longBreak">Long break time: </label>
        <input
          id={"longBreak"}
          type="number"
          value={longBreak}
          placeholder={config.longBreak.toFixed(0)}
          onChange={(e) => setLongBreak(e.target.value)}
        />
      </div>
      {error && <p className={s.error}>{error}</p>}

      <button className={s.submit}>Save</button>
    </form>
  );
};

export default Settings;
