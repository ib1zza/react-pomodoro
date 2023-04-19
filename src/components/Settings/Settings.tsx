import React from 'react';
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

const Settings: React.FC<ISettingsProps> = ({setConfig, config, close}) => {

    const setProperty = (key: keyof Config, value: string | number) => {
        setConfig({...config, [key]: +(+value).toFixed(1)});
    }
    return (
        <motion.div className={s.container} onClick={close} exit={{opacity: 0}} initial={{opacity: 0}} animate={{opacity: 1}}>
            <motion.div className={s.settings} onClick={e => e.stopPropagation()} initial={{scale: 0}} animate={{scale: 1}} exit={{scale: 0, transition: {duration: 0.2}}}>
                <button className={s.close} onClick={close}><FontAwesomeIcon icon={faXmark} /></button>
                <h1>Settings</h1>
                <div className={s.inputs}>
                    <div>
                        <label htmlFor="pomodoro">Pomodoro time: </label>
                        <input id={"pomodoro"} type="number" min={1} max={120}
                               placeholder={config.pomodoro.toFixed(0)}
                               onChange={e => setProperty("pomodoro", e.target.value)}/>
                    </div>
                    <div>
                        <label htmlFor="shortBreak">Short break time: </label>
                        <input id={"shortBreak"} type="number" min={1} max={120}
                               placeholder={config.shortBreak.toFixed(0)}
                               onChange={e => setProperty("shortBreak", e.target.value)}/>
                    </div>
                    <div>
                        <label htmlFor="longBreak">Long break time: </label>
                        <input id={"longBreak"} type="number" min={1} max={120}
                               placeholder={config.longBreak.toFixed(0)}
                               onChange={e => setProperty("longBreak", e.target.value)}/>
                    </div>
                </div>

            </motion.div>
        </motion.div>
    );
};

export default Settings;