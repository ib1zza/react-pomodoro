import { HistoryItem } from "@components/PomodoroHistory/PomodoroHistory";
import { useLocalStorage } from "@hooks/useLocalStorage";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { getUserInfo } from "@utils/queries/getUserInfo";

export const useHistory = (
  initialValue?: HistoryItem[]
): {
  history: HistoryItem[];
  addRecord: (newHistory: HistoryItem) => void;
} => {
  const { user, loading } = useAuth();

  const [history, setHistory] = useLocalStorage("history", initialValue ?? []);
  const [userHistory, setUserHistory] = useState(null);

  useEffect(() => {
    if (!user) return;
    getUserInfo(user.uid).then((user) => {
      if (!user) return;
      setUserHistory(user.pomodoroHistory);
    });
  }, [user]);

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
  };

  useEffect(() => {
    validateHistory();
  }, []);

  return { history: userHistory || history, addRecord };
};
