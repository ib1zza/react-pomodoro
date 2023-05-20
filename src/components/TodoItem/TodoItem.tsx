import React from "react";
import s from "./TodoItem.module.scss";
import { ITodo } from "@components/TodoList/TodoList";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface ITodoItemProps {
  todo: ITodo;
  onComplete: () => void;
  onDelete: (id: string) => void;
}

const convertMsToString = (ms: string) => {
  return new Date(+ms).toLocaleString();
};
const TodoItem: React.FC<ITodoItemProps> = ({ todo, onComplete, onDelete }) => {
  return (
    <div className={s.container}>
      <div className={s.todoTop}>
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={onComplete}
          className={s.checkbox}
        />
        <div className={s.title}>{todo.title}</div>
      </div>
      <div className={s.todoBottom}>
        <div className={s.date}>{convertMsToString(todo.createdAt)}</div>
        <button className={s.delete} onClick={() => onDelete(todo.id)}>
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
