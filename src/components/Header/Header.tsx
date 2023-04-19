import React from 'react';
import s from './Header.module.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGear} from "@fortawesome/free-solid-svg-icons";
import {motion} from "framer-motion";
import {Mode} from "@/App";

interface IHeaderProps {

    openPopup: () => void;
    mode: Mode;

}

const Header: React.FC<IHeaderProps> = ({openPopup, mode}) => {

    return (

        <div>
            <h1 className={s.logo}>Pomodoro <button className={s.settings} onClick={openPopup}><FontAwesomeIcon
                icon={faGear}/></button></h1>

            {mode !== Mode.NOT_STARTED &&  <div className={s.buttons}>
                <motion.div animate={{flexGrow: mode === Mode.ACTIVE ? 1 : 0}}
                            className={s.mode + " " + (mode === Mode.ACTIVE ? s.active : "")}>
                    pomodoro
                </motion.div>
                <motion.div animate={{flexGrow: mode === Mode.SHORT_BREAK ? 1 : 0}}
                            className={s.mode + " " + (mode === Mode.SHORT_BREAK ? s.active : "")}>
                    short break
                </motion.div>
                <motion.div animate={{flexGrow: mode === Mode.LONG_BREAK ? 1 : 0}}
                            className={s.mode + " " + (mode === Mode.LONG_BREAK ? s.active : "")}>
                    long break
                </motion.div>
            </div>}


        </div>

    );
};

export default Header;