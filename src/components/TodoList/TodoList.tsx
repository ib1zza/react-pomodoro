import React, { useState } from "react";
import s from "./TodoList.module.scss";
import { useLocalStorage } from "@hooks/useLocalStorage";
import TodoItem from "@components/TodoItem/TodoItem";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "@components/UI/Button/Button";

import { v4 as uuid } from "uuid";
import CreateTodo from "@components/CreateTodo/CreateTodo";
import { useTodos } from "@hooks/useTodos";

interface ITodoListProps {
  userId: string;
}

export interface ITodo {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
  order?: number;
}

const TodoList: React.FC<ITodoListProps> = ({ userId }) => {
  const { todos, deleteTodo, toggleTodoStatus, createTodo } = useTodos(userId);
  // const [todos, setTodos] = useLocalStorage<ITodo[]>("todos", []);
  const [isCreate, setIsCreate] = useState(false);

  const handleSubmit = (title: string) => {
    createTodo({
      id: uuid(),
      title,
      completed: false,
      createdAt: new Date().getTime().toString(),
      order: 1,
    });

    setIsCreate(false);
  };
  return (
    <div className={s.container}>
      {isCreate ? (
        <CreateTodo
          onSubmit={handleSubmit}
          onAbort={() => setIsCreate(false)}
        />
      ) : (
        <Button className={s.createTodo} onClick={() => setIsCreate(true)}>
          Create <FontAwesomeIcon icon={faPlus} />
        </Button>
      )}
      <div className={s.todos}>
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onComplete={() => toggleTodoStatus(todo.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default TodoList;
