import {Mode} from "@/App";

export function nextMode(mode: Mode, isLong: boolean): Mode {
    console.log("nextMode", mode);
    switch (mode) {
        case Mode.ACTIVE:
            return isLong ? Mode.LONG_BREAK : Mode.SHORT_BREAK;
        case Mode.SHORT_BREAK:
            return Mode.ACTIVE;
        case Mode.LONG_BREAK:
            return Mode.ACTIVE;
        default:
            return Mode.NOT_STARTED;
    }
}