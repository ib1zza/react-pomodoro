import "./App.css";
import Header from "@components/Header/Header";
import Timer from "@components/Timer/Timer";
import Controls from "@components/Controls/Controls";
import { useState } from "react";

export enum Mode {
  ACTIVE = "ACTIVE",
  PAUSED = "PAUSED",
  SHORT_BREAK = "SHORT_BREAK",
  LONG_BREAK = "LONG_BREAK",
  NOT_STARTED = "NOT_STARTED",
}

export interface Config {
  pomodoro: number;
  shortBreak: number;
  longBreak: number;
}

const config: Config = {
  pomodoro: 0.1,
  shortBreak: 0.2,
  longBreak: 15,
};
function App() {
  const [currentMode, setCurrentMode] = useState<Mode>(Mode.NOT_STARTED);

  return (
    <div className="App">
      <h1>{currentMode}</h1>
      <Header />
      <Timer config={config} mode={currentMode} setMode={setCurrentMode} />
      <Controls mode={currentMode} setMode={setCurrentMode} />
    </div>
  );
}

export default App;
