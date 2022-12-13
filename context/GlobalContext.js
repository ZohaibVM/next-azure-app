import { DashboardContextProvider } from "./DashboardContext";
import { ThemeContextProvider } from "./ThemeContext";

const ContextProvider = ({ children }) => {
  return (
    <ThemeContextProvider>
      <DashboardContextProvider>{children}</DashboardContextProvider>
    </ThemeContextProvider>
  );
};

export default ContextProvider;
