import React from "react";
import s from "./TodoItem.module.scss";
import { ITodo } from "@components/TodoList/TodoList";

interface ITodoItemProps {
  todo: ITodo;
  onComplete: () => void;
}

const convertMsToString = (ms: string) => {
  return new Date(+ms).toLocaleString();
};
const TodoItem: React.FC<ITodoItemProps> = ({ todo, onComplete }) => {
  return (
    <div className={s.container}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={onComplete}
        className={s.checkbox}
      />
      <div className={s.title}>{todo.title}</div>
      <div className={s.date}>{convertMsToString(todo.createdAt)}</div>
    </div>
  );
};

export default TodoItem;
