import { useState } from "react";

export const useToggle = (initialState: boolean): [boolean, () => void] => {
  const [isOpen, setIsOpen] = useState<boolean>(initialState);
  const toggle = () => setIsOpen((prevState) => !prevState);
  return [isOpen, toggle];
};
