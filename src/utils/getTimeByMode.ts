import {Config, Mode} from "@/App";


// returns time in seconds
export const getTimeByMode = (config: Config, mode: Mode): number => {

    switch (mode) {
        case Mode.ACTIVE:
            return config.pomodoro * 60;
        case Mode.SHORT_BREAK:
            return config.shortBreak * 60;
        case Mode.LONG_BREAK:
            return config.longBreak * 60;
        default:
            return config.pomodoro * 60;
    }
};