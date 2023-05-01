import React, { useState } from "react";
import s from "./TodoList.module.scss";
import { useLocalStorage } from "@hooks/useLocalStorage";
import TodoItem from "@components/TodoItem/TodoItem";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "@components/UI/Button/Button";
import { useToggle } from "@hooks/useToggle";

interface ITodoListProps {}

export interface ITodo {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
  order?: number;
}

const TodoList: React.FC<ITodoListProps> = ({}) => {
  const [todos, setTodos] = useLocalStorage<ITodo[]>("todos", []);
  const [isCreate, toggleIsCreate] = useToggle(false);
  return (
    <div className={s.container}>
      <Button className={s.createTodo} onClick={toggleIsCreate}>
        Create <FontAwesomeIcon icon={faPlus} />
      </Button>
      {isCreate && (
        <form action="" className={s.form}>
          <input type="text" placeholder={"Type todo here"} />
        </form>
      )}
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  );
};

export default TodoList;
