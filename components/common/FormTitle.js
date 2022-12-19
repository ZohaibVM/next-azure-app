import useTheme from "../../hooks/useTheme";

const FormTitle = ({ title, formTitleRef }) => {
  const {
    selectedTheme: { textColor },
  } = useTheme();
  return (
    <input
      type="text"
      style={{
        color: textColor,
        outline: 0,
      }}
      title="This text is editable"
      className="my-4 d-inline-block text-center font-weight-bold bg-transparent border-0 h2"
      ref={formTitleRef}
      defaultValue={title}
      autoCompletes
    />
  );
};

export default FormTitle;
