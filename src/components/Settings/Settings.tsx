import React, { useState } from "react";
import s from "./Settings.module.scss";
import { Config } from "@/App";
import Login from "@components/Login/Login";
import { useAuth } from "@/context/AuthContext";
import UserInfo from "@components/UserInfo/UserInfo";
import { updateSettings } from "@utils/queries/updateSettings";
import EditTimeForm from "@components/EditTimeForm/EditTimeForm";

interface ISettingsProps {
  config: Config;
  setConfig: React.Dispatch<React.SetStateAction<Config>>;
  close: () => void;
}

const testNum = (s: number | string) => {
  return /\d+$/.test(String(s).trim()) && +s > 0 && +s < 300;
};

const Settings: React.FC<ISettingsProps> = ({ close, setConfig, config }) => {
  const { user } = useAuth();

  function handleSave(
    e: React.FormEvent<HTMLFormElement>,
    config: { [key in keyof Config]: string | number }
  ) {
    e.preventDefault();
    console.log("save");

    if (
      testNum(config.pomodoro) &&
      testNum(config.shortBreak) &&
      testNum(config.longBreak)
    ) {
      setConfig({
        pomodoro: +config.pomodoro,
        shortBreak: +config.shortBreak,
        longBreak: +config.longBreak,
      });

      if (user?.uid) {
        updateSettings(user?.uid, {
          timePomodoro: +config.pomodoro,
          timeShortBreak: +config.shortBreak,
          timeLongBreak: +config.longBreak,
        }).finally(close);
      }
    }
  }

  return (
    <>
      <EditTimeForm handleSave={handleSave} config={config} />
      {!user ? <Login /> : <UserInfo user={user} />}
    </>
  );
};

export default Settings;
