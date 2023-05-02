import React from "react";
import s from "./TodoItem.module.scss";
import { ITodo } from "@components/TodoList/TodoList";

interface ITodoItemProps {
  todo: ITodo;
}

const convertMsToString = (ms: string) => {
  return new Date(+ms).toLocaleString();
};
const TodoItem: React.FC<ITodoItemProps> = ({ todo }) => {
  const handleCompleteTodo = () => {
    console.log("completed");
  };
  return (
    <div className={s.container}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={handleCompleteTodo}
        className={s.checkbox}
      />
      <div className={s.title}>{todo.title}</div>
      <div className={s.date}>{convertMsToString(todo.createdAt)}</div>
    </div>
  );
};

export default TodoItem;
