import { CreateContextProvider } from "./CreateFormContext";
import { DashboardContextProvider } from "./DashboardContext";
import { FormContextProvider } from "./FormContext";
import { ThemeContextProvider } from "./ThemeContext";

const ContextProvider = ({ children }) => {
  return (
    <ThemeContextProvider>
      <DashboardContextProvider>
        <CreateContextProvider>{children}</CreateContextProvider>
      </DashboardContextProvider>
    </ThemeContextProvider>
  );
};

export default ContextProvider;
