import Link from "next/link";

const SideBar = () => {
  return (
    <aside className="dashboard-sidebar">
      <ul className="sidebar">
        <li className="sidebar-list">
          <Link href="/">
            <a className="sidebar-link">
              <i className="fa fa-2x fa-fw fa-home"></i>
              All Forms
            </a>
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default SideBar;
