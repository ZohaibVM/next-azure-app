import { ThemeContext } from "./../context/ThemeContext";
import { useContext } from "react";

const useTheme = () => {
  const ctx = useContext(ThemeContext);
  return ctx;
};

export default useTheme;
