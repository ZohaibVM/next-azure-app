import SideBar from "../Sidebar/Sidebar";
import { useDashboard } from "../../context/DashboardContext";

const Dashboard = (props) => {
  const { isSidebarCollapsed } = useDashboard();

  const renderClasses = () =>
    isSidebarCollapsed
      ? "dashboard dashboard-with-sidebar"
      : "dashboard dashboard-without-sidebar";

  return (
    <section className={renderClasses()}>
      {isSidebarCollapsed && <SideBar />}
      <main className="dashboard-main">{props.children}</main>
    </section>
  );
};

export default Dashboard;
