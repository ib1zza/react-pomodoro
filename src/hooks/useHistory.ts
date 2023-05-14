import { HistoryItem } from "@components/PomodoroHistory/PomodoroHistory";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { addToHistory } from "@utils/queries/addToHistory";

import { db } from "@/firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { ITodo } from "@components/TodoList/TodoList";

export const useHistory = (
  initialValue?: HistoryItem[]
): {
  history: HistoryItem[];
  addRecord: (newHistory: HistoryItem) => void;
} => {
  const { user, loading } = useAuth();

  const [history, setHistory] = useState<HistoryItem[]>(initialValue || []);

  useEffect(() => {
    if (!user) return;
    const unsub = onSnapshot(doc(db, "users", user.uid), (doc) => {
      if (doc.exists()) {
        setHistory(
          (Object.values(
            doc.data().pomodoroHistory as Record<string, HistoryItem>
          ).sort((a: HistoryItem, b: HistoryItem) => {
            console.log(a, b, +a.timeEnd - +b.timeEnd);

            return +b.timeEnd - +a.timeEnd;
          }) as HistoryItem[]) || []
        );
        console.log(Object.values(doc.data().pomodoroHistory));
      }
    });
    return () => {
      unsub();
    };
  }, [user?.uid]);

  const validateHistory = () =>
    setHistory(
      history.filter((h) => {
        let date = new Date(h.timeEnd);
        let now = new Date();
        return (
          date.getDate() === now.getDate() &&
          date.getMonth() === now.getMonth() &&
          date.getFullYear() === now.getFullYear()
        );
      })
    );

  const addRecord = (newHistory: HistoryItem) => {
    setHistory([...history, newHistory]);
    if (!user) return;
    addToHistory(user.uid, newHistory);
  };

  useEffect(() => {
    validateHistory();
  }, []);

  return { history: history, addRecord };
};
