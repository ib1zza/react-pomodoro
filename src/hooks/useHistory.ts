import { HistoryItem } from "@components/PomodoroHistory/PomodoroHistory";
import { useLocalStorage } from "@hooks/useLocalStorage";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { getUserInfo } from "@utils/queries/getUserInfo";
import { addToHistory } from "@utils/queries/addToHistory";

import { db } from "@/firebase";
import { doc, onSnapshot } from "firebase/firestore";

export const useHistory = (
  initialValue?: HistoryItem[]
): {
  history: HistoryItem[];
  addRecord: (newHistory: HistoryItem) => void;
} => {
  const { user, loading } = useAuth();

  const [history, setHistory] = useState<HistoryItem[]>(initialValue || []);
  const [userHistory, setUserHistory] = useState(null);

  useEffect(() => {
    if (!user) return;
    const unsub = onSnapshot(doc(db, "users", user.uid), (doc) => {
      if (doc.exists()) {
        setHistory(
          (Object.values(doc.data().pomodoroHistory) as HistoryItem[]) || []
        );
        console.log(Object.values(doc.data().pomodoroHistory));
      }
    });
    return () => {
      unsub();
    };
  }, [user?.uid]);

  // useEffect(() => {
  //   if (!user) return;
  //   getUserInfo(user.uid).then((user) => {
  //     if (!user) return;
  //
  //     setUserHistory(user.pomodoroHistory || []);
  //   });
  // }, [user]);

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
