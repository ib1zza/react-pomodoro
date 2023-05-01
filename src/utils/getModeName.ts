import { Mode } from "@/App";

export function getModeName(mode: Mode) {
  switch (mode) {
    case Mode.ACTIVE:
      return "pomodoro";
    case Mode.SHORT_BREAK:
      return "short break";
    case Mode.LONG_BREAK:
      return "long break";
    case Mode.PAUSED:
      return "paused";
    case Mode.NOT_STARTED:
      return "not started";
    default:
      return "pomodoro";
  }
}
