import React from "react";
import s from "./TodoItem.module.scss";
import { ITodo } from "@components/TodoList/TodoList";

interface ITodoItemProps {
  todo: ITodo;
}
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
      />
      <div className={s.title}>{todo.title}</div>
      <div className={s.date}>{todo.createdAt.toISOString()}</div>
    </div>
  );
};

export default TodoItem;
