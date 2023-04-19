import React, {useEffect, useState} from "react";
const prefix = "pomodoro/";

const getLocalStorage = <T>(key: string): T | null  => {
   return JSON.parse(localStorage.getItem(prefix + key) || "null");
}

const setLocalStorage = <T>(key: string, value: T) => {
   localStorage.setItem(prefix + key, JSON.stringify(value));
}

export const useLocalStorage = <T>(key: string, initialValue: T): [T, React.Dispatch<React.SetStateAction<T>>] => {
   const [value, setValue] = useState<T>(() => getLocalStorage<T>(key) ?? initialValue  );

   useEffect(() => {
      setLocalStorage(key, value);
   }, [value]);

   return [value, setValue];
}

