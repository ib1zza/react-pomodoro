import { useLocalStorage } from "@hooks/useLocalStorage";
import { ITodo } from "@components/TodoList/TodoList";
import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "@/firebase";
import { useAuth } from "@/context/AuthContext";
import { addTodo } from "@utils/queries/addTodo";
import {
  completeTodoQuery,
  deleteTodoQuery,
  unCompleteTodoQuery,
} from "@utils/queries/completeTodo";

export const useTodos = (userId: string) => {
  const [todos, setTodos] = useState<ITodo[]>([]);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "users", userId), (doc) => {
      if (doc.exists()) {
        setTodos(
          (Object.values(doc.data().todos as Record<string, ITodo>).sort(
            (a: ITodo, b: ITodo) => {
              console.log(a, b, +a.createdAt - +b.createdAt);

              return +b.createdAt - +a.createdAt;
            }
          ) as ITodo[]) || []
        );
        console.log(Object.values(doc.data().todos));
      }
    });
    return () => {
      unsub();
    };
  }, [userId]);

  const createTodo = (newTodo: ITodo) => {
    addTodo(userId, newTodo);
  };

  const completeTodo = (todoId: string) => {
    completeTodoQuery(userId, todoId);
  };

  const unCompleteTodo = (todoId: string) => {
    unCompleteTodoQuery(userId, todoId);
  };

  const toggleTodoStatus = (todoId: string) => {
    const todo = todos.find((t) => t.id === todoId);
    if (!todo || !userId) return;

    if (todo.completed) {
      unCompleteTodo(todoId);
    } else {
      completeTodo(todoId);
    }
  };

  const deleteTodo = (todoId: string) => {
    deleteTodoQuery(userId, todoId);
  };

  return { todos, createTodo, toggleTodoStatus, deleteTodo };
};
