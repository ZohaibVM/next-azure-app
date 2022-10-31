import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";

const invisibleRoutes = ["CreateForm", "EditForm"];

const DashboardContext = React.createContext({
  isSidebarCollapsed: true,
  setIsSidebarCollapsed: () => {},
});

export const DashboardContextProvider = ({ children }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);
  // const { pathname } = useLocation();
  const { pathname } = useRouter();

  useEffect(() => {
    const newPath = pathname.split("/");

    if (invisibleRoutes.includes(newPath[1])) {
      setIsSidebarCollapsed((prevState) => !prevState);
      return;
    }
    setIsSidebarCollapsed(true);
  }, [pathname]);

  return (
    <DashboardContext.Provider
      value={{
        isSidebarCollapsed,
        setIsSidebarCollapsed,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => {
  return useContext(DashboardContext);
};
