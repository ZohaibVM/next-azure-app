import React from "react";
import { Scrollbars } from "react-custom-scrollbars";
import { ADD_APPLICATION_FORM_ELEMENTS } from "../constants/constants";
import useTheme from "../hooks/useTheme";

const RightSection = ({ handleElementsClick, activeStep }) => {
  const checkBorderTop = (name) => !!(name === "Heading");
  const {
    selectedTheme: { primaryColor, sidebarBgColor, iconColor, textColor },
  } = useTheme();

  const styles = {
    overflow: "auto",
    padding: "0",
    position: "absolute",
    inset: 0,
    top: 33,
    // width: "195px",
    // position: "fixed",
    // right: 0,
    // top: 0,
    // bottom: 0,
    // height: "calc(100vh - 69px)",
    // top: "69px",
  };

  return (
    !activeStep.isLastSection && (
      <div
        className="r_c_i_r_formelement"
        // style={{ ...styles, backgroundColor: pageBgColor }}
        style={{ ...styles }}
      >
        <Scrollbars
          style={{
            //  height: "calc(100vh - 69px)",
            height: "100%",
          }}
        >
          {/* <ul style={{ height: "calc(100vh - 69px)" }}> */}
          <ul>
            {ADD_APPLICATION_FORM_ELEMENTS.map(({ name, icon }) => (
              <li
                key={name}
                id={name}
                className="application-form-element-li"
                onClick={handleElementsClick}
                style={{
                  marginTop: 0,
                  marginBottom: 1,
                  marginTop: checkBorderTop(name) ? 1 : 0,
                  height: 45,
                  padding: 5,
                  backgroundColor: sidebarBgColor,
                  paddingLeft: 15,
                  borderBottom: `1px solid ${primaryColor}`,
                }}
              >
                <div
                  className="rci_formelement_icon"
                  style={{ color: iconColor }}
                >
                  <i className={icon}></i>
                </div>
                <div
                  className="rci_formelement_txt"
                  style={{
                    fontWeight: "300",
                    fontSize: "13px",
                    color: textColor,
                  }}
                >
                  {name}
                </div>
              </li>
            ))}
          </ul>
        </Scrollbars>
      </div>
    )
  );
};

export default RightSection;
