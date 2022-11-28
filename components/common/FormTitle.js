import useTheme from "../../hooks/useTheme";

const FormTitle = ({ title }) => {
  const {
    selectedTheme: { textColor },
  } = useTheme();
  return (
    <h3
      contentEditable
      style={{ color: textColor }}
      title="This text is editable"
      className="my-4 d-inline-block"
      //   ref={titleRef}
    >
      {title}
    </h3>
  );
};

export default FormTitle;
