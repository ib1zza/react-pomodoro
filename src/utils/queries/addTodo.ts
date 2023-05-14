import { updateDocument } from "@/utils/queries/updateDoc";
import { ITodo } from "@components/TodoList/TodoList";

export function addTodo(id: string, todo: ITodo) {
  return updateDocument("users", id, {
    ["todos." + todo.id]: todo,
  });
}
