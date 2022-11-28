import useTheme from "../../hooks/useTheme";

const SectionBadge = ({ sections, onActiveSection }) => {
  const {
    selectedTheme: { textColor, whiteColor, secondaryColor },
  } = useTheme();

  return (
    <ul>
      {sections?.map((section, index) => (
        <li
          key={section.sectionId}
          className="afh_bottom_active"
          style={{ cursor: "pointer", color: textColor }}
          onClick={() => onActiveSection(section, index)}
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
            {section?.sectionTitle}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default SectionBadge;
