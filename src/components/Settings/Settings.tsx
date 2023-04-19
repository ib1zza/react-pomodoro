import React, {useState} from 'react';
import s from './Settings.module.scss';
import {motion} from "framer-motion";
import {Config} from "@/App";
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

interface ISettingsProps {
    close: () => void;
    config: Config;
    setConfig: React.Dispatch<React.SetStateAction<Config>>;
}

const testNum = (s: number | string) => {
    return /\d+$/.test(String(s).trim()) && +s > 0 && +s < 300;
}

const Settings: React.FC<ISettingsProps> = ({setConfig, config, close}) => {
    const [pomodoro, setPomodoro] = useState<string | number>(config.pomodoro);
    const [shortBreak, setShortBreak] = useState<string | number>(config.shortBreak);
    const [longBreak, setLongBreak] = useState<string | number>(config.longBreak);
    const [error, setError] = useState<string | null>(null);

    function handleSave(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        console.log("save");

        if (testNum(pomodoro) && testNum(shortBreak) && testNum(longBreak)) {
            setConfig({
                pomodoro: +pomodoro,
                shortBreak: +shortBreak,
                longBreak: +longBreak
            })
            close();
        } else {
            setError("wrong input");
        }
    }

    return (
        <motion.div className={s.container} onClick={close} exit={{opacity: 0}} initial={{opacity: 0}}
                    animate={{opacity: 1}}>
            <motion.div className={s.settings} onClick={e => e.stopPropagation()} initial={{scale: 0}}
                        animate={{scale: 1}} exit={{scale: 0, transition: {duration: 0.2}}}>
                <button className={s.close} onClick={close} ><FontAwesomeIcon icon={faXmark}/></button>
                <h1>Settings</h1>
                <form className={s.inputs} onSubmit={handleSave}>
                    <div>
                        <label htmlFor="pomodoro">Pomodoro time: </label>
                        <input id={"pomodoro"} type="number"
                               placeholder={config.pomodoro.toFixed(0)}
                               value={pomodoro}
                               onChange={e => setPomodoro(e.target.value)}/>
                    </div>
                    <div>
                        <label htmlFor="shortBreak">Short break time: </label>
                        <input id={"shortBreak"} type="number"
                               value={shortBreak}
                               placeholder={config.shortBreak.toFixed(0)}
                               onChange={e => setShortBreak(e.target.value)}/>
                    </div>
                    <div>
                        <label htmlFor="longBreak">Long break time: </label>
                        <input id={"longBreak"} type="number"
                               value={longBreak}
                               placeholder={config.longBreak.toFixed(0)}
                               onChange={e => setLongBreak(e.target.value)}/>
                    </div>
                    {error && <p className={s.error}>{error}</p>}

                    <button className={s.submit} type={"submit"}>Save</button>

                </form>

            </motion.div>
        </motion.div>
    );
};

export default Settings;