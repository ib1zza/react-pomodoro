import { updateDocument } from "@/utils/queries/updateDoc";

interface Config {
  timeLongBreak: number;
  timeShortBreak: number;
  timePomodoro: number;
}

export function updateSettings(id: string, config: Config) {
  return updateDocument("users", id, {
    timeShortBreak: config.timeShortBreak,
    timeLongBreak: config.timeLongBreak,
    timePomodoro: config.timePomodoro,
  });
}
