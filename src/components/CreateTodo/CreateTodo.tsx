import React, { useState } from "react";
import s from "./CreateTodo.module.scss";
import Button from "@components/UI/Button/Button";
import { faCircleXmark, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface ICreateTodoProps {
  onSubmit: (text: string) => void;
  onAbort: () => void;
}
const CreateTodo: React.FC<ICreateTodoProps> = ({ onSubmit, onAbort }) => {
  const [text, setText] = useState("");
  const [error, setError] = useState("");

  function checkInput() {
    if (text.trim() === "") return setError("Title is required");
    onSubmit(text);
  }

  return (
    <div className={s.form}>
      <input
        type="text"
        placeholder={"Type todo here"}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      {error && !text.trim() && <div className={s.error}>{error}</div>}

      <div className={s.buttons}>
        <Button onClick={checkInput}>
          <FontAwesomeIcon icon={faPlus} />
          Create
        </Button>
        <Button onClick={onAbort}>
          <FontAwesomeIcon icon={faCircleXmark} />
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default CreateTodo;
