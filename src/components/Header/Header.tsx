import React from "react";
import s from "./Header.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear, faList } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import { Popup } from "@/App";

interface IHeaderProps {
  openPopup: (name: Popup) => void;
  isOpened: boolean;
}

const Header: React.FC<IHeaderProps> = ({ openPopup, isOpened }) => {
  return (
    <div>
      <h1 className={s.logo}>
        <button className={s.list} onClick={() => openPopup(Popup.TODO)}>
          <FontAwesomeIcon icon={faList} />
        </button>
        <span className={s.logoText}>Pomodoro</span>
        <motion.button
          animate={{ rotate: isOpened ? "60deg" : "0deg" }}
          className={s.settings}
          onClick={() => openPopup(Popup.SETTINGS)}
        >
          <FontAwesomeIcon icon={faGear} />
        </motion.button>
      </h1>
    </div>
  );
};

export default Header;
