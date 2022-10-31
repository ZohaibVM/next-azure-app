import useTheme from "./../hooks/useTheme";
const Drawer = ({ drawerWidth, left, right, isOpen, onClose, children }) => {
  const getClasses = () => {
    if (left) {
      return `drawer drawer-left ${isOpen ? `open` : ""}`;
    } else if (right) {
      return `drawer drawer-right ${isOpen ? `open` : ""}`;
    } else {
      return "";
    }
  };

  const { selectedTheme } = useTheme();

  const { sidebarBgColor, textColor } = selectedTheme;

  return (
    <section
      className={getClasses()}
      style={
        drawerWidth
          ? { backgroundColor: sidebarBgColor, width: drawerWidth }
          : { backgroundColor: sidebarBgColor }
      }
    >
      <button
        className="drawer-close"
        onClick={onClose}
        style={{ color: textColor }}
      >
        <i className="fa fa-times" aria-hidden="true"></i>
      </button>
      <div className="drawer-content" style={{ color: textColor }}>
        {children}
      </div>
    </section>
  );
};

export default Drawer;
