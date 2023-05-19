import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase";

export interface FirebaseUserInfo {
  displayName: string;
  timePomodoro: number;
  timeLongBreak: number;
  uid: string;
  timeShortBreak: number;
  photoURL?: string;
  todos: Todos;
  pomodoroHistory: FirebasePomodoroHistory;
  email: string;
  pomodorosFinished: number;
}

export interface Todos {
  [key: string]: FirebaseTodoItem;
}

export interface FirebaseTodoItem {
  createdAt: string;
  id: string;
  title: string;
  completed: boolean;
  order: number;
}

export interface FirebasePomodoroHistory {
  [key: string]: FirebaseHistoryItem;
}

export interface FirebaseHistoryItem {
  id: number;
  timeEnd: number;
  pomodoroLength: number;
  timeStart: number;
}

export async function getUserInfo(id: string) {
  const ref = doc(db, "users", id);
  return await getDoc(ref).then((doc) => {
    return doc.data() as FirebaseUserInfo;
  });
}
