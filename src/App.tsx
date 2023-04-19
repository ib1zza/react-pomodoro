import "./App.scss";
import Header from "@components/Header/Header";
import Timer from "@components/Timer/Timer";
import Controls from "@components/Controls/Controls";
import React, {useEffect, useState} from "react";
import {useLocalStorage} from "@hooks/useLocalStorage";
import {usePopup} from "@hooks/usePopup";
import {AnimatePresence} from "framer-motion";
import Settings from "@components/Settings/Settings";
import {getTimeByMode} from "@utils/getTimeByMode";

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
    pomodoro: 25,
    shortBreak: 5,
    longBreak: 20,
};

const data = {
    pomodoroCounter: 0,
    config: config,
    currentMode: Mode.NOT_STARTED,
}

function App() {
    const [currentMode, setCurrentMode] = useLocalStorage<Mode>("currentMode", Mode.NOT_STARTED);
    const [pomodoroCounter, setPomodoroCounter] = useLocalStorage<number>("currentCount", 0);
    const {open, close, isOpen, } = usePopup();
    const [prevMode, setPrevMode] = useState<Mode>(Mode.NOT_STARTED);

    const [config, setConfig] = useLocalStorage<Config>("config", {
        pomodoro: 25,
        shortBreak: 5,
        longBreak: 20,
    });

    useEffect(() => {
        if(currentMode !== Mode.PAUSED)
            setPrevMode(currentMode)
    }, [currentMode]);

    useEffect(() => {
        if(currentMode === Mode.NOT_STARTED){
            setPrevMode(Mode.ACTIVE);
        }
    }, [currentMode]);



    const userTime = getTimeByMode(config, currentMode);
    return (
        <>
        <div className="App">
            <h1>{currentMode}</h1>
            <Header openPopup={open} mode={prevMode}/>
            <Timer userTime={userTime} counter={pomodoroCounter} setCounter={setPomodoroCounter} mode={currentMode}
                   setMode={setCurrentMode}/>
            <Controls mode={currentMode} setMode={setCurrentMode}/>
        </div>
            <AnimatePresence>
                {isOpen && <Settings close={close} config={config} setConfig={setConfig}/>}
            </AnimatePresence>
        </>
    );
}

export default App;
