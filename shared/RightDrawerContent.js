import { ADD_APPLICATION_FORM_ELEMENTS } from "../constants/constants";
import useTheme from "./../hooks/useTheme";

const RightDrawerContent = ({ handleElementsClick }) => {
  const {
    selectedTheme: { primaryColor, sidebarBgColor, iconColor, textColor },
  } = useTheme();

  const checkBorderTop = (name) => !!(name === "Heading");

  const styles = {
    overflow: "auto",
    padding: "0",
    position: "absolute",
    inset: 0,
    top: 33,
  };
  return (
    <div className="r_c_i_r_formelement" style={{ ...styles }}>
      <ul>
        {ADD_APPLICATION_FORM_ELEMENTS.map(({ name, icon, type }) => (
          <li
            key={name}
            id={type}
            className="application-form-element-li"
            onClick={handleElementsClick}
            style={{
              backgroundColor: sidebarBgColor,
              marginTop: checkBorderTop(name) ? 1 : 0,
              borderBottom: `1px solid ${primaryColor}`,
            }}
          >
            <div className="rci_formelement_icon" style={{ color: iconColor }}>
              <i className={icon}></i>
            </div>
            <div
              className="rci_formelement_txt"
              style={{
                color: textColor,
              }}
            >
              {name}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RightDrawerContent;
