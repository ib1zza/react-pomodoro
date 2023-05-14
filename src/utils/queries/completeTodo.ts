import { updateDocument } from "@/utils/queries/updateDoc";
import { ITodo } from "@components/TodoList/TodoList";
import { deleteField } from "firebase/firestore";

export function completeTodoQuery(id: string, todoId: string) {
  return updateDocument("users", id, {
    ["todos." + todoId + ".completed"]: true,
  });
}

export function unCompleteTodoQuery(id: string, todoId: string) {
  return updateDocument("users", id, {
    ["todos." + todoId + ".completed"]: false,
  });
}

export function deleteTodoQuery(id: string, todoId: string) {
  return updateDocument("users", id, {
    ["todos." + todoId]: deleteField(),
  });
}
