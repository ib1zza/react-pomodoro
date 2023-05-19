import { updateDocument } from "@/utils/queries/updateDoc";
import { HistoryItem } from "@components/PomodoroHistory/PomodoroHistory";

export async function addToHistory(id: string, historyItem: HistoryItem) {
  return await updateDocument("users", id, {
    ["pomodoroHistory." + historyItem.id]: historyItem,
  });
}
