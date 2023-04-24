import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useState,
} from "react";

interface TimerContextProps {
  timeStart: number;
  timeEnd: number;
  setTimeStart: React.Dispatch<React.SetStateAction<number>>;
  setTimeEnd: React.Dispatch<React.SetStateAction<number>>;
}

export const TimerContext = createContext<TimerContextProps>({
  timeStart: 0,
  timeEnd: 0,
  setTimeStart: () => {},
  setTimeEnd: () => {},
});

export const useTimerContext = () => {
  return useContext(TimerContext);
};

const TimerContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [timeStart, setTimeStart] = useState(0);
  const [timeEnd, setTimeEnd] = useState(0);

  return (
    <TimerContext.Provider
      value={{ timeStart, timeEnd, setTimeEnd, setTimeStart }}
    >
      {children}
    </TimerContext.Provider>
  );
};

export default TimerContextProvider;
