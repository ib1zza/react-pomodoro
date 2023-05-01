import React, { PropsWithChildren } from "react";
import s from "./Modal.module.scss";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

interface IModalProps {
  title: string;
  close: () => void;
}
const Modal: React.FC<PropsWithChildren<IModalProps>> = ({
  title,
  children,
  close,
}) => {
  return (
    <motion.div
      className={s.container}
      onClick={close}
      exit={{ opacity: 0 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        className={s.settings}
        onClick={(e) => e.stopPropagation()}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0, transition: { duration: 0.2 } }}
      >
        <button className={s.close} onClick={close}>
          <FontAwesomeIcon icon={faXmark} />
        </button>
        <h1>{title}</h1>
        {children}
      </motion.div>
    </motion.div>
  );
};

export default Modal;
