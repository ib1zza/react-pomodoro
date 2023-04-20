
import {HistoryItem} from "@components/PomodoroHistory/PomodoroHistory";
import {useLocalStorage} from "@hooks/useLocalStorage";



export const useHistory = (initialValue?: HistoryItem[]): {
    history: HistoryItem[],
    addRecord: (newHistory: HistoryItem) => void
} => {
    const [history, setHistory] = useLocalStorage("history", initialValue ?? []);

    const addRecord = (newHistory: HistoryItem) => {
        setHistory([...history, newHistory]);
    }

    return {history, addRecord};
}

