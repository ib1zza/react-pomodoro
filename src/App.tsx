import "./App.scss";
import Header from "@components/Header/Header";
import Timer from "@components/Timer/Timer";
import Controls from "@components/Controls/Controls";
import React, { useEffect, useState } from "react";
import { useLocalStorage } from "@hooks/useLocalStorage";
import { usePopup } from "@hooks/usePopup";
import { AnimatePresence } from "framer-motion";
import Settings from "@components/Settings/Settings";
import { getTimeByMode } from "@utils/getTimeByMode";
import PomodoroHistory from "@components/PomodoroHistory/PomodoroHistory";
import { useHistory } from "@hooks/useHistory";
import Modal from "@components/UI/Modal/Modal";
import TodoList from "@components/TodoList/TodoList";

export enum Mode {
  ACTIVE = "ACTIVE",
  PAUSED = "PAUSED",
  SHORT_BREAK = "SHORT_BREAK",
  LONG_BREAK = "LONG_BREAK",
  NOT_STARTED = "NOT_STARTED",
}

export enum Popup {
  SETTINGS = "Settings",
  TODO = "Todo",
}

export interface Config {
  pomodoro: number;
  shortBreak: number;
  longBreak: number;
}

function App() {
  const [currentMode, setCurrentMode] = useLocalStorage<Mode>(
    "currentMode",
    Mode.NOT_STARTED
  );
  const [pomodoroCounter, setPomodoroCounter] = useLocalStorage<number>(
    "currentCount",
    0
  );
  const { open, close, isOpen } = usePopup();
  const { open: openTodo, close: closeTodo, isOpen: isOpenTodo } = usePopup();

  const [prevMode, setPrevMode] = useState<Mode>(currentMode);
  const { history, addRecord } = useHistory();
  const [config, setConfig] = useLocalStorage<Config>("config", {
    pomodoro: 0.1,
    shortBreak: 0.1,
    longBreak: 0.1,
  });
  console.log(currentMode);

  useEffect(() => {
    if (currentMode === Mode.PAUSED && prevMode === Mode.PAUSED) {
      setPrevMode(Mode.NOT_STARTED);
      setCurrentMode(Mode.NOT_STARTED);
    }
  }, []);

  useEffect(() => {
    if (currentMode !== Mode.PAUSED) {
      setPrevMode(currentMode);
    }

    if (currentMode === Mode.NOT_STARTED) setPrevMode(Mode.ACTIVE);
  }, [currentMode]);

  const userTime = getTimeByMode(
    config,
    currentMode === Mode.PAUSED ? prevMode : currentMode
  );

  const openPopup = (name: Popup) => {
    switch (name) {
      case Popup.SETTINGS:
        open();
        break;
      case Popup.TODO:
        openTodo();
        break;
      default:
        break;
    }
  };
  return (
    <>
      <div className="App">
        <Header openPopup={openPopup} isOpened={isOpen} />
        <Timer
          userTime={userTime}
          counter={pomodoroCounter}
          setCounter={setPomodoroCounter}
          mode={currentMode}
          setMode={setCurrentMode}
          addRecord={addRecord}
        />
        <Controls mode={currentMode} setMode={setCurrentMode} />
        {history.length > 0 && <PomodoroHistory history={history} />}
      </div>
      <AnimatePresence>
        {isOpen && (
          <Modal title={"Account"} close={close}>
            <Settings close={close} config={config} setConfig={setConfig} />
          </Modal>
        )}
        {isOpenTodo && (
          <Modal title={"Todo"} close={closeTodo}>
            <TodoList />
          </Modal>
        )}
      </AnimatePresence>
    </>
  );
}

export default App;
