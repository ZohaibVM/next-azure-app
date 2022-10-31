import React from "react";
import useTheme from "../hooks/useTheme";

const AddApplicationFormSteps = ({
  activeStep,
  persistentSections,
  handleApplicationFormStepChange,
}) => {
  const {
    selectedTheme: { textColor, secondaryColor, whiteColor },
  } = useTheme();
  return (
    <ul>
      {persistentSections.map((section, index) => (
        <li
          className={
            activeStep.uniqueIdentifier === section.uniqueIdentifier
              ? "afh_bottom_active"
              : null
          }
          key={section.uniqueIdentifier}
          style={{ cursor: "pointer", color: textColor }}
          onClick={() => handleApplicationFormStepChange(section)}
        >
          <div
            className="afh_b_numb"
            style={{
              backgroundColor: secondaryColor,
              borderColor: secondaryColor,
              color: whiteColor,
            }}
          >
            {index + 1}
          </div>
          <div
            className="afh_b_text"
            style={{ wordWrap: "break-word", color: secondaryColor }}
          >
            {section.name}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default AddApplicationFormSteps;
