import Link from "next/link";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

const SideBar = () => {
  const { push } = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("user");
    Cookies.remove("loggedin");
    push("/");
  };

  return (
    <aside className="dashboard-sidebar">
      <ul className="sidebar">
        <li className="sidebar-list">
          <Link href="/AllForms">
            <a className="sidebar-link">
              <i className="fa fa-2x fa-fw fa-home"></i>
              All Forms
            </a>
          </Link>
        </li>
        <li className="sidebar-list">
          {/* <Link href="">
            <a className="sidebar-link" onClick={handleLogout}>
              <i className="fa fa-2x fa-fw fa fa-power-off"></i>
              Log Out
            </a>
          </Link> */}

          <button className="sidebar-link" onClick={handleLogout}>
            <i className="fa fa-2x fa-fw fa fa-power-off"></i> Log Out
          </button>
        </li>
      </ul>
    </aside>
  );
};

export default SideBar;
