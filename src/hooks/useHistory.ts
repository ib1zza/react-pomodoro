
import {HistoryItem} from "@components/PomodoroHistory/PomodoroHistory";
import {useLocalStorage} from "@hooks/useLocalStorage";
import {useEffect} from "react";



export const useHistory = (initialValue?: HistoryItem[]): {
    history: HistoryItem[],
    addRecord: (newHistory: HistoryItem) => void,

} => {
    const [history, setHistory] = useLocalStorage("history", initialValue ?? []);
    const validateHistory = () => setHistory(history.filter(h => {
        let date = new Date(h.timeEnd);
        let now = new Date();
        return date.getDate() === now.getDate() && date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
    }));

    const addRecord = (newHistory: HistoryItem) => {
        setHistory([...history, newHistory]);
    }

    useEffect(() => {
        validateHistory();
    }, [])

    return {history, addRecord};
}

