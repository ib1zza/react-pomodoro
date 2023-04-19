export const getFormattedTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes < 10 ? "0" : ""}${minutes > 0 ? minutes : "0"}:${
        seconds < 10 ? "0" : ""
    }${seconds > 0 ? seconds : "0"}`;
};