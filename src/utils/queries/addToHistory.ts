import { updateDocument } from "@/utils/queries/updateDoc";
import { HistoryItem } from "@components/PomodoroHistory/PomodoroHistory";

export function addToHistory(id: string, historyItem: HistoryItem) {
  return updateDocument("users", id, {
    ["pomodoroHistory." + historyItem.id]: historyItem,
  });
}
