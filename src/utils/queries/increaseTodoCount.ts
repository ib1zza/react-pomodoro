import { updateDocument } from "@utils/queries/updateDoc";
import { increment } from "firebase/firestore";

export const increaseTodoCount = async (userId: string) => {
  return await updateDocument("users", userId, {
    pomodorosFinished: increment(1),
  });
};
